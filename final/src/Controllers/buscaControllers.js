// Importar as funções do Model
const BuscaModel = require('../Models/buscaModels');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /busca
// ============================================================
async function listarTodos(req, res) {
  try {
    const questoes = await BuscaModel.listarTodos();
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao listar questões',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /busca/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const questao = await BuscaModel.buscarPorId(id);

    if (questao) {
      res.status(200).json(questao);
    } else {
      res.status(404).json({ mensagem: `Questão ${id} não encontrada` });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar questão',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorVestibular (ASSÍNCRONA)
// ROTA: GET /busca/vestibular/:vestibular
// ============================================================
async function buscarPorVestibular(req, res) {
  try {
    const { vestibular } = req.params;
    const questoes = await BuscaModel.buscarPorVestibular(vestibular);
    
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar questões por vestibular',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorAno (ASSÍNCRONA)
// ROTA: GET /busca/ano/:ano
// ============================================================
async function buscarPorAno(req, res) {
  try {
    const ano = parseInt(req.params.ano);

    if (isNaN(ano)) {
      return res.status(400).json({ mensagem: 'Ano inválido' });
    }

    const questoes = await BuscaModel.buscarPorAno(ano);
    
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar questões por ano',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorPalavraChave (ASSÍNCRONA)
// ROTA: GET /busca/palavra-chave/:palavra
// ============================================================
async function buscarPorPalavraChave(req, res) {
  try {
    const { palavra } = req.params;
    const questoes = await BuscaModel.buscarPorPalavraChave(palavra);
    
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar questões por palavra-chave',
      erro: erro.message
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorVestibular,
  buscarPorAno,
  buscarPorPalavraChave
};