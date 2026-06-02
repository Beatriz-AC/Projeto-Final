// Importar a conexão com o banco de dados
const pool = require('../Config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todas as questões da View BUSCA
// RETORNO: Promise que resolve com array de questões
// ============================================================
async function listarTodos() {
  try {
    const result = await pool.query('SELECT * FROM BUSCA');
    return result.rows;
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca uma questão específica pelo ID
// PARÂMETRO: id (número)
// RETORNO: Promise que resolve com a questão ou undefined
// ============================================================
async function buscarPorId(id) {
  try {
    const result = await pool.query('SELECT * FROM BUSCA WHERE id_questao = $1', [id]);
    return result.rows[0];
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// FUNÇÃO: buscarPorVestibular
// DESCRIÇÃO: Busca questões por nome do vestibular
// PARÂMETRO: vestibular (string)
// RETORNO: Promise com array de questões
// ============================================================
async function buscarPorVestibular(vestibular) {
  try {
    const result = await pool.query(
      'SELECT * FROM BUSCA WHERE vestibular ILIKE $1 ORDER BY ano DESC',
      [`%${vestibular}%`]
    );
    return result.rows;
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// FUNÇÃO: buscarPorAno
// DESCRIÇÃO: Busca questões por ano do vestibular
// PARÂMETRO: ano (número)
// RETORNO: Promise com array de questões
// ============================================================
async function buscarPorAno(ano) {
  try {
    const result = await pool.query(
      'SELECT * FROM BUSCA WHERE ano = $1 ORDER BY titulo ASC',
      [ano]
    );
    return result.rows;
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// FUNÇÃO: buscarPorPalavraChave
// DESCRIÇÃO: Busca questões por palavra-chave
// PARÂMETRO: palavra (string)
// RETORNO: Promise com array de questões
// ============================================================
async function buscarPorPalavraChave(palavra) {
  try {
    const result = await pool.query(
      'SELECT * FROM BUSCA WHERE palavra_chave ILIKE $1 ORDER BY ano DESC',
      [`%${palavra}%`]
    );
    return result.rows;
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// EXPORTAR AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorVestibular,
  buscarPorAno,
  buscarPorPalavraChave
};