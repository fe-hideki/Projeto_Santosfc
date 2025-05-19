var express = require("express");
var router = express.Router();
var questionarioController = require("../controllers/questionarioController");

router.post("/enviar", questionarioController.salvarRespostas);
router.get("/estatisticas", questionarioController.obterEstatisticas);

module.exports = router;