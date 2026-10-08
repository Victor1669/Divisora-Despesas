import {
  Form as RouterForm,
  Link,
  redirect,
  type ActionFunctionArgs,
} from "react-router";
import { Container, Card, Form, Button } from "react-bootstrap";
import { criarUsuario } from "../services/usuarios";
import { getUsuario } from "../config/sessao";

export function loader() {
  if (getUsuario()) return redirect("/");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const dados = Object.fromEntries(await request.formData());

  try {
    await criarUsuario({
      nome: String(dados.nome),
      email: String(dados.email),
      senha: String(dados.senha),
    });
    return redirect("/login");
  } catch {
    return null;
  }
}

export function Component() {
  return (
    <Container className="mt-5" style={{ maxWidth: "420px" }}>
      <Card className="p-4 shadow-sm">
        <h4>Cadastro</h4>
        <RouterForm method="post" className="mt-3">
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
            <Form.Text>Mínimo de 8 caracteres.</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Cadastrar
          </Button>
        </RouterForm>
        <p className="mt-3 mb-0 text-center">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </Card>
    </Container>
  );
}
