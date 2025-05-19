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