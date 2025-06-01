// Importa os models
var usuarioModel = require("../models/usuarioModel");

// Login do usuário
function autenticar(req, res) {
    // Pega email e senha do req.body.
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        // Chama o model para buscar usuário 
        usuarioModel.autenticar(email, senha)
            .then(function (resultado) {
                // Se encontrar 1, retorna os dados para o front
                if (resultado.length == 1) {
                    res.json({
                        id: resultado[0].id,
                        email: resultado[0].email,
                        nome: resultado[0].nome
                    });
                // Se zero, retorna 403
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                // Se mais de 1 (problema no banco)
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }); 
    }
}

// Cadastrar novo usuário
function cadastrar(req, res) {
    // Recebe dados do mesmo usuário
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var nascimento = req.body.nascimentoServer;
    var endereco = req.body.enderecoServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var senha = req.body.senhaServer;

    // Validação
    if (!nome || !email || !cpf || !nascimento || !endereco || !cidade || !estado || !senha) {
        res.status(400).send("Campos obrigatórios não preenchidos.");
    } else {
        // Chama o model para cadastrar no banco
        usuarioModel
            .cadastrar(nome, email, cpf, nascimento, endereco, cidade, estado, senha)
            .then((resultado) => {
                //Retorna sucesso com o ID do novo cadastro
                const id = resultado[0].id;
                res.status(201).json({
                    mensagem: "Usuário cadastrado com sucesso!",
                    id: id
                });
            }) // Trata o erro e envia para o front
            .catch((erro) => {
                console.log("Erro ao cadastrar:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Exporta as funções
module.exports = {
    autenticar,
    cadastrar
};