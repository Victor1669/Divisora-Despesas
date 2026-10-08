import {
  Form as RouterForm,
  Link,
  redirect,
  type ActionFunctionArgs,
} from "react-router";
import { Container, Card, Form, Button } from "react-bootstrap";
import { login } from "../services/auth";
import { getUsuario, salvarSessao } from "../config/sessao";

export function loader() {
  if (getUsuario()) return redirect("/");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const dados = Object.fromEntries(await request.formData());

  try {
    const { token } = await login({
      email: String(dados.email),
      senha: String(dados.senha),
    });
    salvarSessao(token);
    return redirect(getUsuario()?.role === "admin" ? "/" : "/despesas");
  } catch {
    return null;
  }
}

export function Component() {
  return (
    <Container className="mt-5" style={{ maxWidth: "420px" }}>
      <Card className="p-4 shadow-sm">
        <h4>Entrar</h4>
        <RouterForm method="post" className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" name="email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" name="senha" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Entrar
          </Button>
        </RouterForm>
        <p className="mt-3 mb-0 text-center">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </Card>
    </Container>
  );
}
