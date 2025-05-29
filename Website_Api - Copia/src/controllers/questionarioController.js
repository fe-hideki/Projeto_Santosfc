// Atualizado questionarioController.js com validação e parsing corretos
// Importa o model do questionário
var questionarioModel = require("../models/questionarioModel");

// Recebe do front as respostas do questionário, valida e salva
function salvarRespostas(req, res) {
  console.log("REQ.BODY RECEBIDO:", req.body);
  const { id, respostas } = req.body;

  // Validação básica dos dados
  if (!id || !Array.isArray(respostas) || respostas.length !== 10) {
    return res.status(400).json({ mensagem: "Dados incompletos" });
  }

  // Reformata o array para um objeto { pergunta: resposta }
  const respostasFormatadas = {};
  respostas.forEach(resp => {
    respostasFormatadas[resp.pergunta] = resp.resposta;
  });

  // Chama o model para inserir no banco
  questionarioModel.inserirRespostas(id, respostasFormatadas)
    .then(() => res.status(200).json({ mensagem: "Respostas salvas com sucesso!" }))
    .catch((erro) => {
      console.error("Erro no model:", erro);
      res.status(500).json({ erro: "Erro ao salvar questionário" });
    });
}

// Chama o model que traz estatísticas gerais e devolve para o front
function obterEstatisticas(req, res) {
  questionarioModel.obterEstatisticas()
    .then(resultados => res.status(200).json(resultados))
    .catch(erro => {
      console.log(erro);
      res.status(500).json({ erro: "Erro ao obter estatísticas" });
    });
}

// Aguarda os resultados de várias consultas no model e retorna um objeto com os principais indicadores
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

// Exporta as funções para serem usadas nas rotas
module.exports = {
  salvarRespostas,
  obterEstatisticas,
  obterKPIs
};


