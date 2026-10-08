import { Link } from "react-router";
import { Container } from "react-bootstrap";

export function NaoEncontrado() {
  return (
    <Container className="mt-5 text-center">
      <h1 className="display-1">404</h1>
      <p className="lead">Página não encontrada.</p>
      <Link to="/" className="btn btn-primary">
        Voltar ao início
      </Link>
    </Container>
  );
}
