const pool = require('../Config/database');

// ========================================
// LISTAR TODAS AS QUESTÕES
// ========================================
async function listarTodos() {
  const result = await pool.query(`
    SELECT *
    FROM BUSCA
    ORDER BY ano DESC, id_questao
  `);

  return result.rows;
}

// ========================================
// BUSCAR POR ID
// ========================================
async function buscarPorId(id) {
  const result = await pool.query(`
    SELECT *
    FROM BUSCA
    WHERE id_questao = $1
  `, [id]);

  return result.rows[0];
}

// ========================================
// BUSCAR POR PALAVRA
// ========================================
async function buscarPorPalavra(palavra) {
  const result = await pool.query(`
    SELECT *
    FROM BUSCA
    WHERE
      titulo ILIKE $1 OR
      enunciado ILIKE $1 OR
      palavra_chave ILIKE $1
  `, [`%${palavra}%`]);

  return result.rows;
}

// ========================================
// BUSCAR POR VESTIBULAR
// ========================================
async function buscarPorVestibular(vestibular) {
  const result = await pool.query(`
    SELECT *
    FROM BUSCA
    WHERE vestibular ILIKE $1
    ORDER BY ano DESC
  `, [`%${vestibular}%`]);

  return result.rows;
}

// ========================================
// BUSCAR POR ANO
// ========================================
async function buscarPorAno(ano) {
  const result = await pool.query(`
    SELECT *
    FROM BUSCA
    WHERE ano = $1
  `, [ano]);

  return result.rows;
}

// ========================================
// BUSCAR POR DIFICULDADE
// ========================================
async function buscarPorDificuldade(dificuldade) {
  const result = await pool.query(`
    SELECT *
    FROM BUSCA
    WHERE dificuldade ILIKE $1
  `, [`%${dificuldade}%`]);

  return result.rows;
}

// ========================================
// LISTAR TÓPICOS
// ========================================
async function listarTopicos() {
  const result = await pool.query(`
    SELECT
      COALESCE(NULLIF(topico, ''), NULLIF(nome_t, ''), palavra_chave) AS nome_t,
      COUNT(*) AS total
    FROM BUSCA
    GROUP BY COALESCE(NULLIF(topico, ''), NULLIF(nome_t, ''), palavra_chave)
    ORDER BY COUNT(*) DESC, nome_t
  `);

  return result.rows;
}

// ========================================
// BUSCAR POR TÓPICO
// ========================================
async function buscarPorTopico(topico) {
  const result = await pool.query(`
    SELECT *
    FROM BUSCA
    WHERE COALESCE(NULLIF(topico, ''), NULLIF(nome_t, ''), palavra_chave) ILIKE $1
    ORDER BY ano DESC, id_questao
  `, [`%${topico}%`]);

  return result.rows;
}

// ========================================
// BUSCAR RESPOSTA DA QUESTÃO
// ========================================
async function buscarResposta(idQuestao) {
  const result = await pool.query(`
    SELECT *
    FROM Respostas
    WHERE idq_r = $1
  `, [idQuestao]);

  return result.rows[0];
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorPalavra,
  buscarPorVestibular,
  buscarPorAno,
  buscarPorDificuldade,
  listarTopicos,
  buscarPorTopico,
  buscarResposta,
};