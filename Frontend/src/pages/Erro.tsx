import { Link } from "react-router";
import { Container } from "react-bootstrap";

export function Erro() {
  return (
    <Container className="mt-5 text-center">
      <h1 className="display-1">Ops!</h1>
      <p className="lead">Algo deu errado ao carregar esta página.</p>
      <Link to="/" reloadDocument className="btn btn-primary">
        Voltar ao início
      </Link>
    </Container>
  );
}
