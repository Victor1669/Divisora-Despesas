import app from "./app.js";

import AppDataSource from "./src/config/data-source.js";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}!`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
    process.exit(1);
  });
