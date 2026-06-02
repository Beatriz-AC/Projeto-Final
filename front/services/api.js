const API = "http://localhost:3000"; 


export const getQuestoes = async () => {
  const res = await fetch(`${API}/questoes`);
  return res.json();
};

export const getQuestaoById = async (id) => {
  const res = await fetch(`${API}/questoes/${id}`);
  return res.json();
};


export const getRespostaByQuestaoId = async (idQuestao) => {
  const res = await fetch(`${API}/respostas/questao/${idQuestao}`);
  return res.json();
};


export const getTopicos = async () => {
  const res = await fetch(`${API}/topicos`);
  return res.json();
};

export const getVestibulares = async () => {
  const res = await fetch(`${API}/vestibulares`);
  return res.json();
};

export const getQuestoes = async () => {
  const res = await fetch(`${API}/questoes`);
  return res.json();
};