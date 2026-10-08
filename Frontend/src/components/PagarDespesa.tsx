import { useState, type FormEvent } from "react";
import { useRevalidator } from "react-router";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useUsuario } from "../config/UsuarioContext";
import { pagarDivisao } from "../services/pagamentos";
import type { ExpenseType } from "../types";

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function PagarDespesa({ despesa }: { despesa: ExpenseType }) {
  const usuario = useUsuario();
  const { revalidate } = useRevalidator();
  const [valor, setValor] = useState("");

  const split = despesa.splits.find((item) => item.usuarioId === usuario.id);

  if (!split) return null;

  const totalPago = split.pagamentos.reduce(
    (soma, pagamento) => soma + Number(pagamento.valor),
    0,
  );
  const restante = Number(split.valorDevido) - totalPago;

  async function pagar(evento: FormEvent) {
    evento.preventDefault();

    try {
      await pagarDivisao(split!.id, Number(valor));
      setValor("");
      revalidate();
    } catch {
      return;
    }
  }

  if (split.pago) {
    return <p className="mt-3 mb-0 text-success">Sua parte está paga.</p>;
  }

  return (
    <Form onSubmit={pagar} className="mt-3">
      <p className="mb-2">
        Sua parte: {moeda(Number(split.valorDevido))} · Pago: {moeda(totalPago)}{" "}
        · Restante: {moeda(restante)}
      </p>
      <InputGroup>
        <InputGroup.Text>R$</InputGroup.Text>
        <Form.Control
          type="number"
          step="0.01"
          min="0.01"
          max={restante.toFixed(2)}
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          required
        />
        <Button type="submit" variant="success">
          Pagar
        </Button>
      </InputGroup>
    </Form>
  );
}
