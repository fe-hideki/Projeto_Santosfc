// Atualizado questionarioController.js com validação e parsing corretos
var questionarioModel = require("../models/questionarioModel");

function salvarRespostas(req, res) {
  console.log("REQ.BODY RECEBIDO:", req.body);
  const { idCadastro, respostas } = req.body;

  if (!idCadastro || !Array.isArray(respostas) || respostas.length !== 10) {
    return res.status(400).json({ mensagem: "Dados incompletos" });
  }

  const respostasFormatadas = {};
  respostas.forEach(resp => {
    respostasFormatadas[resp.pergunta] = resp.resposta;
  });

  questionarioModel.inserirRespostas(idCadastro, respostasFormatadas)
    .then(() => res.status(200).json({ mensagem: "Respostas salvas com sucesso!" }))
    .catch((erro) => {
      console.error("Erro no model:", erro);
      res.status(500).json({ erro: "Erro ao salvar questionário" });
    });
}

function obterEstatisticas(req, res) {
  questionarioModel.obterEstatisticas()
    .then(resultados => res.status(200).json(resultados))
    .catch(erro => {
      console.log(erro);
      res.status(500).json({ erro: "Erro ao obter estatísticas" });
    });
}

async function obterKPIs(req, res) {
  try {
    const [participantes] = await questionarioModel.contarParticipantes();
    const [estados] = await questionarioModel.contarEstadosParticipantes();
    const [jovens] = await questionarioModel.percentualJovens();
    const [cidade] = await questionarioModel.cidadeMaisAtiva();

    res.status(200).json({
      totalParticipantes: participantes.total,
      totalEstados: estados.total_estados,
      percentualJovens: jovens.percentual_jovens,
      cidadeMaisAtiva: cidade.cidade
    });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: "Erro ao obter KPIs" });
  }
}

module.exports = {
  salvarRespostas,
  obterEstatisticas,
  obterKPIs
};

