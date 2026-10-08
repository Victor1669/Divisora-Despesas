import { Container, Card } from "react-bootstrap";
import { useUsuario } from "../config/UsuarioContext";

export function Component() {
  const usuario = useUsuario();

  return (
    <Container className="mt-4" style={{ maxWidth: "520px" }}>
      <h2 className="mb-4">Meu Perfil</h2>
      <Card className="p-4 shadow-sm">
        <p>
          <strong>Nome:</strong> {usuario.nome}
        </p>
        <p>
          <strong>E-mail:</strong> {usuario.email}
        </p>
        <p>
          <strong>Perfil:</strong>{" "}
          {usuario.role === "admin" ? "Administrador" : "Usuário"}
        </p>
        <p className="mb-0">
          <strong>Membro desde:</strong>{" "}
          {new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
        </p>
      </Card>
    </Container>
  );
}
