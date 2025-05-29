var database = require("../database/config");

// Insere as respostas do usuário no banco na tabela questionario
// fkCadastro é o id do usuário que respondeu.
// Os campos q1 a q10 são as respostas para as 10 perguntas.

function inserirRespostas(id, respostas) {
  let instrucaoSql = `
    INSERT INTO resposta (fkUsuario, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
    VALUES (${id}, '${respostas.q1}', '${respostas.q2}', '${respostas.q3}', '${respostas.q4}',
            '${respostas.q5}', '${respostas.q6}', '${respostas.q7}', '${respostas.q8}',
            '${respostas.q9}', '${respostas.q10}');
  `;
  // Retorna uma Promise, que o controller vai usar para saber se deu certo.
  return database.executar(instrucaoSql);
}

// Retorna uma lista de Promises com estatísticas para cada pergunta.
function obterEstatisticas() {
  const queries = [];

  // Para cada pergunta (q1 até q10), conta quantas vezes cada resposta apareceu.
  for (let i = 1; i <= 10; i++) {
    queries.push(
      database.executar(`SELECT q${i} as resposta, COUNT(*) as total FROM resposta GROUP BY q${i}`)
    );
  }
  // Usa Promise.all para rodar todas as queries paralelamente e retornar tudo junto.
  return Promise.all(queries);
}


module.exports = {
  inserirRespostas,
  obterEstatisticas
};

// contarParticipantes: conta total de respostas enviadas.
function contarParticipantes() {
  const sql = `SELECT COUNT(*) AS total FROM resposta;`;
  return database.executar(sql);
}

// contarEstadosParticipantes: conta estados diferentes dos usuários que responderam.
function contarEstadosParticipantes() {
  const sql = `
    SELECT COUNT(DISTINCT estado) AS total_estados
    FROM usuario
    JOIN resposta ON usuario.id = resposta.fkUsuario;
  `;
  return database.executar(sql);
}

// percentualJovens: calcula % de respostas que indicam faixa etária jovem (baseado na pergunta 10).
function percentualJovens() {
  const sql = `
    SELECT
      ROUND((SUM(CASE WHEN q10 IN ('Menos de 18', '18 a 29') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) AS percentual_jovens
    FROM resposta;
  `;
  return database.executar(sql);
}

// cidadeMaisAtiva: identifica cidade com mais respostas
function cidadeMaisAtiva() {
  const sql = `
    SELECT cidade, COUNT(*) AS total
    FROM usuario
    JOIN resposta ON usuario.id = resposta.fkUsuario
    GROUP BY cidade
    ORDER BY total DESC
    LIMIT 1;
  `;
  return database.executar(sql);
}

// Exportação das funções
module.exports = {
  inserirRespostas,
  obterEstatisticas,
  contarParticipantes,
  contarEstadosParticipantes,
  percentualJovens,
  cidadeMaisAtiva
};