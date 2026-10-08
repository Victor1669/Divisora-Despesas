# Divisora-Despesas 💸

Aplicação web para gerenciamento de despesas entre múltiplos usuários, facilitando o controle e a divisão de gastos de forma organizada e transparente.

[![Stars](https://img.shields.io/github/stars/Victor1669/Divisora-Despesas?style=social)](https://github.com/Victor1669/Divisora-Despesas/stargazers)
[![Forks](https://img.shields.io/github/forks/Victor1669/Divisora-Despesas?style=social)](https://github.com/Victor1669/Divisora-Despesas/forks)

## 🚀 Features

- **Gerenciamento de Usuários:** Cadastro e autenticação segura de usuários.
- **Registro de Despesas:** Crie despesas detalhadas, indicando quem pagou e o valor total.
- **Divisão Inteligente:** Distribua despesas entre múltiplos participantes, definindo valores individuais.
- **Acompanhamento de Pagamentos:** Marque as divisões como pagas e visualize o histórico de pagamentos.
- **Dashboard Interativo:** Visualize um resumo gráfico dos gastos por pessoa para um melhor entendimento do fluxo financeiro.
- **Controle de Acesso:** Diferentes níveis de acesso (usuário e admin) garantem a segurança e a organização.
- **Autenticação JWT:** Proteção de rotas sensíveis através de tokens JWT.
- **Validação de Dados:** Utilização do Zod para garantir a integridade e segurança dos dados recebidos.
- **Rate Limiting:** Proteção contra ataques de força bruta nas rotas de autenticação.

## 🛠️ Tech Stack

- **Backend:** Node.js, TypeScript, Express, TypeORM, MySQL, Argon2, JWT
- **Frontend:** React, TypeScript, Vite, React Router, Bootstrap, Chart.js

## 🚀 Instalação

Siga estes passos para configurar o projeto em sua máquina:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Victor1669/Divisora-Despesas.git
    cd Divisora-Despesas
    ```

2.  **Instale as dependências do backend:**

    ```bash
    cd Backend
    pnpm install
    ```

3.  **Configure as variáveis de ambiente do backend:**
    Crie um arquivo `.env` na raiz do diretório `Backend` com as seguintes variáveis:

    ```env
    DATABASE=seu_banco_de_dados
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USERNAME=seu_usuario_db
    DATABASE_PASSWORD=sua_senha_db
    JWT_SECRET=sua_chave_secreta_jwt
    PORT=3000
    ```

4.  **Execute as migrations do banco de dados:**

    ```bash
    pnpm run run-migrations
    ```

5.  **Inicie o servidor backend:**

    ```bash
    pnpm run dev
    ```

6.  **Instale as dependências do frontend:**

    ```bash
    cd ../Frontend
    pnpm install
    ```

7.  **Inicie o servidor de desenvolvimento frontend:**
    ```bash
    pnpm run dev
    ```

O backend estará rodando em `http://localhost:3000` e o frontend em `http://localhost:5173` (ou a porta definida pelo Vite).

## 📖 Como Usar

O Divisora-Despesas é ideal para:

- **Amigos dividindo contas:** Facilite o rateio de gastos em viagens, jantares ou qualquer outra atividade em grupo.
- **Repúblicas e Coabitantes:** Organize as despesas da casa de forma clara e justa.
- **Casais gerenciando finanças:** Tenha um controle transparente sobre os gastos compartilhados.

**Fluxo de Uso:**

1.  **Login/Cadastro:** Acesse a página de login e crie uma conta ou entre com suas credenciais.
2.  **Adicionar Despesas:** Na seção "Despesas", registre novos gastos, definindo quem pagou e como o valor será dividido entre os participantes.
3.  **Acompanhar Pagamentos:** Visualize as despesas em aberto, veja o que já foi pago e pague sua parte restante.
4.  **Histórico:** Consulte todas as despesas quitadas na seção "Histórico".
5.  **Dashboard (Admin):** Administradores podem visualizar um painel com o balanço geral dos gastos por pessoa.
6.  **Gerenciar Participantes (Admin):** Adicione ou gerencie os usuários do sistema na seção "Participantes".

## 👥 Gerenciamento de Despesas

Para criar uma nova despesa, preencha os campos:

- **Descrição:** Nome da despesa (ex: Aluguel, Supermercado).
- **Valor:** Valor total da despesa.
- **Pago Por:** Selecione o usuário que efetuou o pagamento.
- **Divisão:** Informe o valor que cada participante deve pagar. Deixe em branco para quem não participa.

### Exemplo de Criação de Despesa:

```typescript
// Exemplo de como a requisição pode ser feita internamente
import { criarDespesa } from "../services/despesas";

await criarDespesa({
  descricao: "Conta de Luz",
  valor: 150.0,
  pagoPorId: 1, // ID do usuário que pagou
  splits: [
    { usuarioId: 1, valorDevido: 75.0 },
    { usuarioId: 2, valorDevido: 75.0 },
  ],
});
```

Para pagar sua parte em uma despesa:

1.  Acesse a seção "Despesas".
2.  Na despesa desejada, localize a seção "Sua parte".
3.  Informe o valor a ser pago e clique em "Pagar".

## 📁 Estrutura do Projeto

```
Divisora-Despesas/
├── Backend/
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── migrations/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   └── mockData/
│   ├── app.ts
│   ├── server.ts
│   ├── tsconfig.json
│   └── package.json
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

## 📚 API Reference

O backend expõe as seguintes rotas:

- **Autenticação (`/auth`)**
  - `POST /login`: Realiza o login do usuário.
  - `GET /me`: Retorna informações do usuário logado.

- **Usuários (`/usuarios`)**
  - `POST /`: Cria um novo usuário.
  - `GET /`: Lista todos os usuários (requer admin).

- **Despesas (`/despesas`)**
  - `POST /`: Cria uma nova despesa.
  - `GET /`: Lista as despesas em aberto do usuário.
  - `GET /historico`: Lista as despesas quitadas.
  - `POST /splits/:id/pagamentos`: Registra um pagamento para uma divisão específica.

- **Dashboard (`/dashboard`)**
  - `GET /`: Retorna o total gasto por pessoa (requer admin).

## 🤝 Contribuição

Contribuições são muito bem-vindas! Se você deseja contribuir, por favor, siga estes passos:

1.  Faça um fork do projeto.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações.
4.  Commit suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade')`.
5.  Push para a branch (`git push origin feature/sua-feature`).
6.  Abra um Pull Request.

Por favor, certifique-se de que seu código esteja formatado e testado.

## 🔗 Links Importantes

- **Repositório:** [https://github.com/Victor1669/Divisora-Despesas](https://github.com/Victor1669/Divisora-Despesas)
- **Autor:** [Victor1669](https://github.com/Victor1669)

## 📝 Footer

Feito por [Victor1669](https://github.com/Victor1669)

[![Star me on GitHub](https://img.shields.io/github/watchers/Victor1669/Divisora-Despesas?style=social&logo=github)](https://github.com/Victor1669/Divisora-Despesas/watchers)
[![Top Langs](https://img.shields.io/github/languages/top/Victor1669/Divisora-Despesas)](https://github.com/Victor1669/Divisora-Despesas/search?l=typescript)

---

**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
