import { useLoaderData } from "react-router";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listarGastosPorPessoa } from "../services/dashboard";
import { exigirAdmin } from "../config/sessao";
import { useUsuario } from "../config/UsuarioContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export function loader() {
  exigirAdmin();
  return listarGastosPorPessoa();
}

export function Component() {
  const gastos = useLoaderData<typeof loader>();
  const usuario = useUsuario();

  const chartData = {
    labels: gastos.map((item) => item.nome),
    datasets: [
      {
        data: gastos.map((item) => item.total),
        backgroundColor: [
          "#0d6efd",
          "#6c757d",
          "#198754",
          "#ffc107",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-1">Olá, {usuario.nome}!</h2>
      <p className="text-muted mb-4">Painel de Balanço</p>
      <Row>
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h4>Gastos por Pessoa</h4>
            <div
              className="mt-3"
              style={{ maxWidth: "300px", margin: "0 auto" }}
            >
              <Doughnut data={chartData} />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
