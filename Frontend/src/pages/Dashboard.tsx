import { useLoaderData } from "react-router";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listarDespesas } from "../services/despesas";
import { listarHistorico } from "../services/pagamentos";
import { exigirAdmin } from "../config/sessao";
import { useUsuario } from "../config/UsuarioContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const CORES = [
  "#0d6efd",
  "#198754",
  "#dc3545",
  "#ffc107",
  "#6f42c1",
  "#fd7e14",
  "#20c997",
  "#6c757d",
];

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export async function loader() {
  exigirAdmin();
  const [abertas, concluidas] = await Promise.all([
    listarDespesas(),
    listarHistorico(),
  ]);
  return [...abertas, ...concluidas].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function Component() {
  const despesas = useLoaderData<typeof loader>();
  const usuario = useUsuario();

  return (
    <Container className="mt-4">
      <h2 className="mb-1">Olá, {usuario.nome}!</h2>
      <p className="text-muted mb-4">Painel de Balanço</p>
      {despesas.length === 0 && <p>Nenhuma despesa cadastrada.</p>}
      <Row>
        {despesas.map((despesa) => {
          const partes = despesa.splits.flatMap((split, indice) => {
            const cor = CORES[indice % CORES.length];
            const pago = split.pagamentos.reduce(
              (soma, pagamento) => soma + Number(pagamento.valor),
              0,
            );
            const pendente =
              Math.round((Number(split.valorDevido) - pago) * 100) / 100;

            return [
              { label: `${split.usuario.nome} - Pago`, valor: pago, cor },
              {
                label: `${split.usuario.nome} - Pendente`,
                valor: pendente,
                cor: `${cor}55`,
              },
            ].filter((parte) => parte.valor > 0);
          });

          return (
            <Col key={despesa.id} md={6} lg={4} className="mb-4">
              <Card className="p-4 shadow-sm h-100">
                <h5 className="mb-0">{despesa.descricao}</h5>
                <p className="text-muted">
                  {moeda(Number(despesa.valor))} ·{" "}
                  {new Date(despesa.createdAt).toLocaleDateString("pt-BR")}
                </p>
                <Doughnut
                  data={{
                    labels: partes.map((parte) => parte.label),
                    datasets: [
                      {
                        data: partes.map((parte) => parte.valor),
                        backgroundColor: partes.map((parte) => parte.cor),
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { position: "bottom" },
                      tooltip: {
                        callbacks: {
                          label: (item) =>
                            `${item.label}: ${moeda(item.parsed)}`,
                        },
                      },
                    },
                  }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
