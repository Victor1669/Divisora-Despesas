import { useEffect, useRef } from "react";
import {
  Form as RouterForm,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
} from "react-router";
import {
  Container,
  Table,
  Form,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { criarDespesa, listarDespesas } from "../services/despesas";
import { listarUsuarios } from "../services/usuarios";
import { PagarDespesa } from "../components/PagarDespesa";

export async function loader() {
  const [despesas, usuarios] = await Promise.all([
    listarDespesas(),
    listarUsuarios(),
  ]);
  return { despesas, usuarios };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dados = Object.fromEntries(formData);

  const splits = [...formData.entries()]
    .filter(([chave, valor]) => chave.startsWith("split-") && valor !== "")
    .map(([chave, valor]) => ({
      usuarioId: Number(chave.replace("split-", "")),
      valorDevido: Number(valor),
    }));

  try {
    await criarDespesa({
      descricao: String(dados.descricao),
      valor: Number(dados.valor),
      pagoPorId: Number(dados.pagoPorId),
      splits,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export function Component() {
  const { despesas, usuarios } = useLoaderData<typeof loader>();
  const resultado = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const nomes = Object.fromEntries(usuarios.map((u) => [u.id, u.nome]));

  useEffect(() => {
    if (resultado?.ok) formRef.current?.reset();
  }, [resultado]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Gerenciar Despesas</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="p-4 shadow-sm">
            <h4>Nova Despesa</h4>
            <RouterForm method="post" ref={formRef} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control type="text" name="descricao" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Valor (R$)</Form.Label>
                <Form.Control type="number" step="0.01" name="valor" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pago Por</Form.Label>
                <Form.Select name="pagoPorId" defaultValue="" required>
                  <option value="">Selecione...</option>
                  {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Divisão (R$ por pessoa)</Form.Label>
                {usuarios.map((u) => (
                  <InputGroup key={u.id} className="mb-2">
                    <InputGroup.Text className="w-50">{u.nome}</InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      name={`split-${u.id}`}
                      placeholder="0,00"
                    />
                  </InputGroup>
                ))}
                <Form.Text>Deixe em branco quem não participa.</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Adicionar
              </Button>
            </RouterForm>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4>Despesas em Aberto</h4>
            <Table responsive striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Quem Pagou</th>
                  <th>Divisão</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map((item) => (
                  <tr key={item.id}>
                    <td>{item.descricao}</td>
                    <td>R$ {Number(item.valor).toFixed(2)}</td>
                    <td>{nomes[item.pagoPorId] ?? "N/A"}</td>
                    <td>
                      <ul className="list-unstyled mb-0">
                        {item.splits.map((split) => (
                          <li key={split.id}>
                            {nomes[split.usuarioId] ?? "N/A"}: R${" "}
                            {Number(split.valorDevido).toFixed(2)}{" "}
                            <Badge bg={split.pago ? "success" : "secondary"}>
                              {split.pago ? "Pago" : "Pendente"}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                      <PagarDespesa despesa={item} />
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
