import { useLoaderData } from "react-router";
import { Container, Card, Table } from "react-bootstrap";
import { listarHistorico } from "../services/pagamentos";

export function loader() {
  return listarHistorico();
}

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function Component() {
  const despesas = useLoaderData<typeof loader>();

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Histórico</h2>
      {despesas.length === 0 && <p>Nenhuma despesa quitada ainda.</p>}
      {despesas.map((despesa) => (
        <Card key={despesa.id} className="p-4 shadow-sm mb-3">
          <h5>
            {despesa.descricao} — {moeda(Number(despesa.valor))}
          </h5>
          <p className="text-muted">
            Criada em {new Date(despesa.createdAt).toLocaleDateString("pt-BR")}
          </p>
          <Table size="sm" className="mb-0">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantia</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {despesa.splits.flatMap((split) =>
                split.pagamentos.map((pagamento) => (
                  <tr key={pagamento.id}>
                    <td>{split.usuario.nome}</td>
                    <td>{moeda(Number(pagamento.valor))}</td>
                    <td>
                      {new Date(pagamento.createdAt).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </Table>
        </Card>
      ))}
    </Container>
  );
}
