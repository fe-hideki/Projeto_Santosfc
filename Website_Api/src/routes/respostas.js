const express = require("express");
const router = express.Router();
const db = require("../database/db"); // ajuste para o caminho correto do seu módulo de conexão

// Inserir respostas do usuário
router.post("/", async (req, res) => {
  const { fkUsuario, fkPergunta, fkAlternativa } = req.body;

  try {
    await db.execute(
      "INSERT INTO resposta_usuario (fkUsuario, fkPergunta, fkAlterativa) VALUES (?, ?, ?)",
      [fkUsuario, fkPergunta, fkAlternativa]
    );
    res.status(200).send("Resposta registrada com sucesso.");
  } catch (err) {
    console.error("Erro ao inserir resposta:", err);
    res.status(500).send("Erro ao registrar resposta.");
  }
});

// Estatísticas de respostas
router.get("/estatisticas", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.texto AS pergunta, 
        a.texto AS alternativa, 
        COUNT(ru.idResposta_Usuario) AS total
      FROM resposta_usuario ru
      JOIN pergunta p ON ru.fkPergunta = p.idPergunta
      JOIN alternativa a ON ru.fkAlternativa = a.idAlternativa
      GROUP BY ru.fkPergunta, ru.fkAlternativa
      ORDER BY ru.fkPergunta, ru.fkAlternativa;
    `);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar estatísticas:", err);
    res.status(500).send("Erro ao buscar estatísticas.");
  }
});

module.exports = router;