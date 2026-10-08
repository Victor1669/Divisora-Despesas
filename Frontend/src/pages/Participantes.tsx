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
} from "react-bootstrap";
import { criarUsuario, listarUsuarios } from "../services/usuarios";
import { exigirAdmin } from "../config/sessao";

export function loader() {
  exigirAdmin();
  return listarUsuarios();
}

export async function action({ request }: ActionFunctionArgs) {
  const dados = Object.fromEntries(await request.formData());

  console.log(dados);

  try {
    await criarUsuario({
      nome: String(dados.nome),
      email: String(dados.email),
      senha: String(dados.senha),
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export function Component() {
  const usuarios = useLoaderData<typeof loader>();
  const resultado = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resultado?.ok) formRef.current?.reset();
  }, [resultado]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Gerenciar Participantes</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="p-4 shadow-sm">
            <h4>Adicionar</h4>
            <RouterForm method="post" ref={formRef} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="nome" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="senha"
                  minLength={8}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Salvar
              </Button>
            </RouterForm>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4>Lista de Participantes</h4>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.email || "-"}</td>
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
