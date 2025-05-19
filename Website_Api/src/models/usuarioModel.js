var database = require("../database/db")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idCadastro, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, cpf, nascimento, endereco, cidade, estado, senha) {
  var instrucaoSql = `
    INSERT INTO usuario (nome, email, cpf, nascimento, endereco, cidade, estado, senha)
    VALUES ('${nome}', '${email}', '${cpf}', '${nascimento}', '${endereco}', '${cidade}', '${estado}', '${senha}');
`;
  return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};