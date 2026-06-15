const BuscaModel = require('../Models/buscaModels');

// Listar todas
async function listarTodos(req, res) {
  try {
    const dados = await BuscaModel.listarTodos();
    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
}

// Buscar por ID
async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    const dados = await BuscaModel.buscarPorId(id);

    if (!dados) {
      return res.status(404).json({
        mensagem: 'Questão não encontrada'
      });
    }

    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
}

// Buscar por palavra
async function buscarPorPalavra(req, res) {
  try {
    const { palavra } = req.params;

    const dados =
      await BuscaModel.buscarPorPalavra(palavra);

    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
}

// Buscar vestibular
async function buscarPorVestibular(req, res) {
  try {
    const { vestibular } = req.params;

    const dados =
      await BuscaModel.buscarPorVestibular(
        vestibular
      );

    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
}

// Buscar ano
async function buscarPorAno(req, res) {
  try {
    const { ano } = req.params;

    const dados =
      await BuscaModel.buscarPorAno(ano);

    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
}

// Buscar dificuldade
async function buscarPorDificuldade(req, res) {
  try {
    const { dificuldade } = req.params;

    const dados =
      await BuscaModel.buscarPorDificuldade(
        dificuldade
      );

    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
}

// Buscar resposta
async function buscarResposta(req, res) {
  try {
    const { id } = req.params;

    const dados =
      await BuscaModel.buscarResposta(id);

    res.status(200).json(dados);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorPalavra,
  buscarPorVestibular,
  buscarPorAno,
  buscarPorDificuldade,
  buscarResposta
};