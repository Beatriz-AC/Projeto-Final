// Importar a conexão com o banco de dados
const db = require('../Config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todas as questões da View BUSCA
// RETORNO: Promise que resolve com array de questões
// ============================================================
function listarTodos() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM BUSCA ORDER BY ano DESC, titulo ASC';
    
    db.all(sql, [], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca uma questão específica pelo ID
// PARÂMETRO: id (número)
// RETORNO: Promise que resolve com a questão ou undefined
// ============================================================
function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM BUSCA WHERE id_questao = ?';
    
    db.get(sql, [id], (erro, linha) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linha);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorVestibular
// DESCRIÇÃO: Busca questões por nome do vestibular
// PARÂMETRO: vestibular (string)
// RETORNO: Promise com array de questões
// ============================================================
function buscarPorVestibular(vestibular) {
  return new Promise((resolve, reject) => {
    const sql = ` SELECT * FROM BUSCA WHERE vestibular LIKE ? ORDER BY ano DESC `;
    
    db.all(sql, [`%${vestibular}%`], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorAno
// DESCRIÇÃO: Busca questões por ano do vestibular
// PARÂMETRO: ano (número)
// RETORNO: Promise com array de questões
// ============================================================
function buscarPorAno(ano) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM BUSCA WHERE ano = ? ORDER BY titulo ASC';
    
    db.all(sql, [ano], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorPalavraChave
// DESCRIÇÃO: Busca questões por palavra-chave
// PARÂMETRO: palavra (string)
// RETORNO: Promise com array de questões
// ============================================================
function buscarPorPalavraChave(palavra) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM BUSCA WHERE palavra_chave LIKE ? ORDER BY ano DESC `;
    
    db.all(sql, [`%${palavra}%`], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
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