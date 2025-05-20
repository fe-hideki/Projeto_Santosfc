var database = require("../database/config");

function inserirRespostas(idCadastro, respostas) {
  let instrucaoSql = `
    INSERT INTO questionario (fkCadastro, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
    VALUES (${idCadastro}, '${respostas.q1}', '${respostas.q2}', '${respostas.q3}', '${respostas.q4}',
            '${respostas.q5}', '${respostas.q6}', '${respostas.q7}', '${respostas.q8}',
            '${respostas.q9}', '${respostas.q10}');
  `;

  return database.executar(instrucaoSql);
}

function obterEstatisticas() {
  const queries = [];
  for (let i = 1; i <= 10; i++) {
    queries.push(
      database.executar(`SELECT q${i} as resposta, COUNT(*) as total FROM questionario GROUP BY q${i}`)
    );
  }
  return Promise.all(queries);
}

module.exports = {
  inserirRespostas,
  obterEstatisticas
};

function contarParticipantes() {
  const sql = `SELECT COUNT(*) AS total FROM questionario;`;
  return database.executar(sql);
}

function contarEstadosParticipantes() {
  const sql = `
    SELECT COUNT(DISTINCT estado) AS total_estados
    FROM usuario
    JOIN questionario ON usuario.idCadastro = questionario.fkCadastro;
  `;
  return database.executar(sql);
}

function percentualJovens() {
  const sql = `
    SELECT
      ROUND((SUM(CASE WHEN q10 IN ('Menos de 18', '18 a 29') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) AS percentual_jovens
    FROM questionario;
  `;
  return database.executar(sql);
}

function cidadeMaisAtiva() {
  const sql = `
    SELECT cidade, COUNT(*) AS total
    FROM usuario
    JOIN questionario ON usuario.idCadastro = questionario.fkCadastro
    GROUP BY cidade
    ORDER BY total DESC
    LIMIT 1;
  `;
  return database.executar(sql);
}

module.exports = {
  inserirRespostas,
  obterEstatisticas,
  contarParticipantes,
  contarEstadosParticipantes,
  percentualJovens,
  cidadeMaisAtiva
};