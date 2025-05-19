var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idCadastro, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, cpf, nascimento, endereco, cidade, estado, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, cpf, nascimento, endereco, cidade, estado, senha)
        VALUES ('${nome}', '${email}', '${cpf}', '${nascimento}', '${endereco}', '${cidade}', '${estado}', '${senha}');
    `;

    return database.executar(instrucaoSql)
        .then(() => {
            var buscarUltimoId = `
                SELECT idCadastro FROM usuario WHERE email = '${email}' ORDER BY idCadastro DESC LIMIT 1;
            `;
            return database.executar(buscarUltimoId);
        });
}

module.exports = {
    autenticar,
    cadastrar
};