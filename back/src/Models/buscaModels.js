// Importar a conexão com o banco de dados
const pool = require('../Config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todas as questões
// RETORNO: Promise que resolve com array de questões
// ============================================================
async function listarTodos() {
  try {
    const result = await pool.query(`
      SELECT q.id_q, q.nome_q, q.enunciado_q, q.palavra_chave_q, 
             t.nome_t as topico, v.nome_v as vestibular, v.ano_v as ano
      FROM questoes q
      LEFT JOIN topicos t ON q.idt = t.id_t
      LEFT JOIN vestibular v ON q.idv = v.id_v
      ORDER BY v.ano_v DESC, q.id_q
    `);
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
    const result = await pool.query(`
      SELECT q.id_q, q.nome_q, q.enunciado_q, q.palavra_chave_q,
             t.nome_t as topico, v.nome_v as vestibular, v.ano_v as ano
      FROM questoes q
      LEFT JOIN topicos t ON q.idt = t.id_t
      LEFT JOIN vestibular v ON q.idv = v.id_v
      WHERE q.id_q = $1
    `, [id]);
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
    const result = await pool.query(`
      SELECT q.id_q, q.nome_q, q.enunciado_q, q.palavra_chave_q,
             t.nome_t as topico, v.nome_v as vestibular, v.ano_v as ano
      FROM questoes q
      LEFT JOIN topicos t ON q.idt = t.id_t
      LEFT JOIN vestibular v ON q.idv = v.id_v
      WHERE v.nome_v ILIKE $1
      ORDER BY v.ano_v DESC
    `, [`%${vestibular}%`]);
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
    const result = await pool.query(`
      SELECT q.id_q, q.nome_q, q.enunciado_q, q.palavra_chave_q,
             t.nome_t as topico, v.nome_v as vestibular, v.ano_v as ano
      FROM questoes q
      LEFT JOIN topicos t ON q.idt = t.id_t
      LEFT JOIN vestibular v ON q.idv = v.id_v
      WHERE v.ano_v = $1
      ORDER BY q.nome_q
    `, [ano]);
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
    const result = await pool.query(`
      SELECT q.id_q, q.nome_q, q.enunciado_q, q.palavra_chave_q,
             t.nome_t as topico, v.nome_v as vestibular, v.ano_v as ano
      FROM questoes q
      LEFT JOIN topicos t ON q.idt = t.id_t
      LEFT JOIN vestibular v ON q.idv = v.id_v
      WHERE q.palavra_chave_q ILIKE $1 OR q.nome_q ILIKE $1
      ORDER BY v.ano_v DESC
    `, [`%${palavra}%`]);
    return result.rows;
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// FUNÇÃO: buscarPorTopico
// DESCRIÇÃO: Busca questões por tópico
// PARÂMETRO: topico (string ou id)
// RETORNO: Promise com array de questões
// ============================================================
async function buscarPorTopico(topico) {
  try {
    // Se for número, busca por ID; se for string, busca por nome
    const result = await pool.query(`
      SELECT q.id_q, q.nome_q, q.enunciado_q, q.palavra_chave_q,
             t.id_t, t.nome_t as topico, v.nome_v as vestibular, v.ano_v as ano
      FROM questoes q
      LEFT JOIN topicos t ON q.idt = t.id_t
      LEFT JOIN vestibular v ON q.idv = v.id_v
      WHERE t.nome_t ILIKE $1 OR t.id_t = $2
      ORDER BY v.ano_v DESC, q.id_q
    `, [`%${topico}%`, isNaN(topico) ? -1 : parseInt(topico)]);
    return result.rows;
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// FUNÇÃO: listarTopicos
// DESCRIÇÃO: Lista todos os tópicos disponíveis
// RETORNO: Promise com array de tópicos
// ============================================================
async function listarTopicos() {
  try {
    const result = await pool.query(`
      SELECT DISTINCT t.id_t, t.nome_t, COUNT(q.id_q) as total
      FROM topicos t
      LEFT JOIN questoes q ON t.id_t = q.idt
      GROUP BY t.id_t, t.nome_t
      ORDER BY t.nome_t
    `);
    return result.rows;
  } catch (erro) {
    throw erro;
  }
}

// ============================================================
// FUNÇÃO: buscarResposta
// DESCRIÇÃO: Busca a resposta correta de uma questão
// PARÂMETRO: idQuestao (número)
// RETORNO: Promise que resolve com a resposta ou undefined
// ============================================================
async function buscarResposta(idQuestao) {
  try {
    const result = await pool.query(`
      SELECT r.id_r, r.resp_texto_r, r.comentario_prof_r, r.idq_r
      FROM respostas r
      WHERE r.idq_r = $1
    `, [idQuestao]);
    return result.rows[0];
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
  buscarPorPalavraChave,
  buscarPorTopico,
  listarTopicos,
  buscarResposta
};