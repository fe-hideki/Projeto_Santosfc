var database = require("../database/config");

// Consulta o banco para verificar se existe usuário com email e senha
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    // Retorna dados básicos do usuário caso encontre.
    return database.executar(instrucaoSql);
}

// Insere novo usuário na tabela usuario
function cadastrar(nome, email, cpf, nascimento, endereco, cidade, estado, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, cpf, nascimento, endereco, cidade, estado, senha)
        VALUES ('${nome}', '${email}', '${cpf}', '${nascimento}', '${endereco}', '${cidade}', '${estado}', '${senha}');
    `;
// Depois, busca o último id gerado para esse email e retorna
    return database.executar(instrucaoSql)
        .then(() => {
            var buscarUltimoId = `
                SELECT id FROM usuario WHERE email = '${email}' ORDER BY id DESC LIMIT 1;
            `;
            return database.executar(buscarUltimoId);
        });
}

// Exportação das 
module.exports = {
    autenticar,
    cadastrar
};