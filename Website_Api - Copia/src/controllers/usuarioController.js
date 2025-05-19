var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultado) {
                if (resultado.length == 1) {
                    res.json({
                        idCadastro: resultado[0].idCadastro,
                        email: resultado[0].email,
                        nome: resultado[0].nome
                    });
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
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

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var nascimento = req.body.nascimentoServer;
    var endereco = req.body.enderecoServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var senha = req.body.senhaServer;

    if (!nome || !email || !cpf || !nascimento || !endereco || !cidade || !estado || !senha) {
        res.status(400).send("Campos obrigatórios não preenchidos.");
    } else {
        usuarioModel
            .cadastrar(nome, email, cpf, nascimento, endereco, cidade, estado, senha)
            .then((resultado) => {
                const idCadastro = resultado[0].idCadastro;
                res.status(201).json({
                    mensagem: "Usuário cadastrado com sucesso!",
                    idCadastro: idCadastro
                });
            })
            .catch((erro) => {
                console.log("Erro ao cadastrar:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};