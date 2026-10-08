import { Link, NavLink, useNavigate } from "react-router";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import { limparSessao } from "../config/sessao";
import { useUsuario } from "../config/UsuarioContext";

export function Navbar() {
  const usuario = useUsuario();
  const navigate = useNavigate();
  const admin = usuario.role === "admin";

  function sair() {
    limparSessao();
    navigate("/login");
  }

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to={admin ? "/" : "/despesas"}>
          Divisora
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {admin && (
              <Nav.Link as={NavLink} to="/" end>
                Dashboard
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/despesas">
              Despesas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/historico">
              Histórico
            </Nav.Link>
            {admin && (
              <Nav.Link as={NavLink} to="/participantes">
                Participantes
              </Nav.Link>
            )}
          </Nav>
          <Nav className="me-3">
            <Nav.Link as={NavLink} to="/perfil">
              {usuario.nome}
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" size="sm" onClick={sair}>
            Sair
          </Button>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
