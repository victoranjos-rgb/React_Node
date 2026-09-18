import express from "express";
import cors from "cors"; // Importando o módulo CORS
import { banco } from "./banco.js";

const app = express();
app.use(cors()); // Habilitando CORS para todas as rotas
app.use(express.json());

app.get("/api/trens", (req, res) => {
  const busca = req.query.busca;

  if (busca) {
    const trens = banco
      .prepare(
        "SELECT * FROM trens WHERE prefixo LIKE ? OR modelo LIKE ? ODER BY prefixo",
      )
      .all(`%${busca}%`, `%${busca}%`);
    return res.json(trens);
  }
  const trens = banco.prepare("SELECT * FROM trens ORDER BY prefixo").all();

  res.json(trens);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
