import { useEffect, useState } from 'react'

// ====================== FUNÇÕES AUXILIARES ======================

// Função que separa as alternativas (A, B, C, D, E) do texto do enunciado
function extrairAlternativas(enunciado) {
  const alternativas = []

  if (enunciado.includes('(A)')) {
    alternativas.push({
      letra: 'A',
      texto: enunciado.split('(A)')[1].split('(B)')[0]
    })
  }

  if (enunciado.includes('(B)')) {
    alternativas.push({
      letra: 'B',
      texto: enunciado.split('(B)')[1].split('(C)')[0]
    })
  }

  if (enunciado.includes('(C)')) {
    alternativas.push({
      letra: 'C',
      texto: enunciado.split('(C)')[1].split('(D)')[0]
    })
  }

  if (enunciado.includes('(D)')) {
    alternativas.push({
      letra: 'D',
      texto: enunciado.split('(D)')[1].split('(E)')[0]
    })
  }

  if (enunciado.includes('(E)')) {
    alternativas.push({
      letra: 'E',
      texto: enunciado.split('(E)')[1]
    })
  }

  return alternativas
}

// Função que limpa o enunciado, removendo o texto das alternativas
function limparEnunciado(enunciado) {
  const partes = enunciado.split('(A)')
  return partes[0]
}

function Questoes() {

  // ====================== ESTADOS (useState) ======================
  const [questoes, setQuestoes] = useState([])                    // Lista completa de questões
  const [questaoAtual, setQuestaoAtual] = useState(null)          // Questão que aparece na tela
  const [indiceAtual, setIndiceAtual] = useState(0)               // Índice da questão atual
  const [topicos, setTopicos] = useState([])                      // Lista de tópicos para filtro
  const [dificuldades, setDificuldades] = useState([])           // Lista de dificuldades para filtro
  const [selectedTopico, setSelectedTopico] = useState('')        // Tópico selecionado
  const [selectedDificuldade, setSelectedDificuldade] = useState('') // Dificuldade selecionada
  const [searchType, setSearchType] = useState('id')              // Tipo de busca (id, ano, vestibular)
  const [termoBusca, setTermoBusca] = useState('')                // Texto digitado na busca
  const [alternativaSelecionada, setAlternativaSelecionada] = useState('') // Alternativa escolhida pelo aluno
  const [textoResposta, setTextoResposta] = useState('')          // Resposta para questões dissertativas
  const [resultado, setResultado] = useState(null)                // Resultado da correção

  // Alternativas extraídas da questão atual
  const alternativas = questaoAtual
  ? extrairAlternativas(questaoAtual.enunciado_q)
  : []


  // ====================== FUNÇÃO: CARREGAR QUESTÕES ======================
  async function carregarQuestoes() {
  try {
    const response = await fetch('/busca')
    const data = await response.json()

    setQuestoes(data)
    setIndiceAtual(0)
    setQuestaoAtual(data[0])

    setSelectedTopico('')
    setSelectedDificuldade('')
    setSearchType('id')
    setTermoBusca('')

    setAlternativaSelecionada('')
    setTextoResposta('')
    setResultado(null)
  } catch (error) {
    alert('Erro ao carregar as questões.')
  }
}

  // ====================== FUNÇÃO: CARREGAR TÓPICOS ======================
  async function carregarTopicos() {
    try {
      const response = await fetch('/busca/topicos-lista')
      const data = await response.json()
      setTopicos(data)
    } catch (error) {
      setTopicos([])
    }
  }

  // ====================== FUNÇÃO: CARREGAR DIFICULDADES ======================
  async function carregarDificuldades() {
    try {
      const response = await fetch('/busca/dificuldades-lista')
      const data = await response.json()
      setDificuldades(data)
    } catch (error) {
      setDificuldades([])
    }
  }

  // ====================== FUNÇÃO: BUSCAR POR TÓPICO ======================
  async function buscarPorTopico(topicoId) {
    try {
      const response = await fetch(`/busca/topicos/${topicoId}`)
      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) {
        alert('Nenhuma questão encontrada para este tópico.')
        return
      }
      const sorted = [...data].sort((a, b) => Number(a.id_q) - Number(b.id_q))
      setQuestoes(sorted)
      setQuestaoAtual(sorted[0])
      setIndiceAtual(0)
      setAlternativaSelecionada('')
      setResultado(null)
    } catch (error) {
      alert('Erro ao buscar por tópico.')
    }
  }

  // ====================== FUNÇÃO: BUSCAR POR DIFICULDADE ======================
  async function buscarPorDificuldade(dificuldadeId) {
  try {
    const response = await fetch('/busca/dificuldades/' + dificuldadeId)
    const data = await response.json()

    if (data.length === 0) {
      alert('Nenhuma questão encontrada para esta dificuldade.')
      return
    }

    setQuestoes(data)
    setQuestaoAtual(data[0])
    setIndiceAtual(0)
    setAlternativaSelecionada('')
    setResultado(null)
  } catch (error) {
    alert('Erro ao buscar por dificuldade.')
  }
}

  // ====================== USEEFFECT - CARREGAMENTO INICIAL ======================
  useEffect(() => {
    carregarTopicos()
    carregarDificuldades()
    carregarQuestoes()
  }, [])

  // ====================== FUNÇÃO: SELECIONAR QUESTÃO ======================
  function selecionarQuestao(questao, indice = indiceAtual) {
    setQuestaoAtual(questao)
    setIndiceAtual(indice)
    setAlternativaSelecionada('')
    setTextoResposta('')
    setResultado(null)
  }

  // ====================== BLOCO DE BUSCA (código solto) ======================
  if (searchType === 'id') {
  let index = -1

  for (let i = 0; i < questoes.length; i++) {
    if (questoes[i].id_q == termo) {
      index = i
      break
    }
  }

  if (index >= 0) {
    selecionarQuestao(questoes[index], index)
    return
  

  alert('Nenhuma questão encontrada para este ID.')
  return
  }
}

    if (searchType === 'ano') {
  const response = await fetch('/busca/ano/' + termo)

  if (!response.ok) {
    alert('Nenhuma questão encontrada para este ano.')
    return
  }

  const data = await response.json()

  if (data.length === 0) {
    alert('Nenhuma questão encontrada para este ano.')
    return
  }

  setQuestoes(data)
  setQuestaoAtual(data[0])
  setIndiceAtual(0)
  setAlternativaSelecionada('')
  setResultado(null)

  return
}

if (searchType === 'vestibular') {
  const response = await fetch('/busca/vestibular/' + termo)

  if (!response.ok) {
    alert('Nenhuma questão encontrada para este vestibular.')
    return
  }

  const data = await response.json()

  if (data.length === 0) {
    alert('Nenhuma questão encontrada para este vestibular.')
    return
  }

  setQuestoes(data)
  setQuestaoAtual(data[0])
  setIndiceAtual(0)
  setAlternativaSelecionada('')
  setResultado(null)

  return
}

    let index = -1

for (let i = 0; i < questoes.length; i++) {
  if (
    questoes[i].id_q == termo ||
    questoes[i].enunciado_q.toLowerCase().includes(termoLower)
  ) {
    index = i
    break
  }
}

if (index >= 0) {
  selecionarQuestao(questoes[index], index)
  return
}

alert('Nenhuma questão encontrada.')

  // ====================== FUNÇÃO: PRÓXIMA QUESTÃO ======================
  function proximaQuestao() {
    if (questoes.length === 0) return

    const proximoIndice = (indiceAtual + 1) % questoes.length
    selecionarQuestao(questoes[proximoIndice], proximoIndice)
  }

  // ====================== FUNÇÃO: CONFIRMAR RESPOSTA ======================
  async function confirmarResposta() {
    if (!questaoAtual) return

    if (alternativas.length > 0) {
      if (!alternativaSelecionada) {
          alert('Por favor, selecione uma alternativa.')
          return
        }
      } else {
        if (!textoResposta.trim()) {
          alert('Escreva sua resposta antes de enviar.')
    }

    try {
      const response = await fetch(`/busca/${questaoAtual.id_q}/resposta`)
      if (!response.ok) {
        let errorData = {}
        try {
          errorData = await response.json()
        } catch (parseError) {
          // ignore invalid JSON
        }
        const message = errorData.mensagem || 'Erro ao buscar a resposta correta.'
        alert(message)
        return
      }

      const data = await response.json()
      const respostaCorreta = String(data.resp_texto_r || '').trim()
      let correta = null
      let comentario = data.comentario_prof_r || 'Sem comentário disponível.'
      let usuario = ''
      let resultadoTipo = 'unknown'

      if (alternativas.length > 0) {
        const match = respostaCorreta.match(/^\(?([A-E])\)?/i)
        correta = match ? match[1].toUpperCase() : respostaCorreta[0]?.toUpperCase()
        resultadoTipo = correta === alternativaSelecionada ? 'correct' : 'incorrect'
        usuario = alternativaSelecionada
      } else {
        usuario = textoResposta.trim()
        const clean = (value) =>
          String(value || '')
            .trim()
            .toLowerCase()
        correta = respostaCorreta
        resultadoTipo = clean(usuario) === clean(correta) ? 'correct' : 'incorrect'
      }

      setResultado({
        correta,
        comentario,
        enviado: usuario,
        tipo: resultadoTipo,
      })
    } catch (error) {
      alert(error.message || 'Erro ao buscar a resposta correta.')
    }
  }

  // ====================== RETORNO DA INTERFACE (JSX) ======================
  return (
    <>
      <main className="questoes-page">
        <div className="container">
          <div className="list-controls">
            
            {/* BOTÃO: Recarregar lista */}
            <button className="btn btn-success" type="button" onClick={carregarQuestoes}>
              Recarregar lista
            </button>

            <div className="search-box">
              
              {/* SELECT: Tipo de busca */}
              <select
                aria-label="Buscar por"
                value={searchType}
                onChange={(event) => setSearchType(event.target.value)}
              >
                <option value="id">Buscar por ID</option>
                <option value="ano">Buscar por ano</option>
                <option value="vestibular">Buscar por vestibular</option>
              </select>

              {/* SELECT: Tópicos */}
              <select
                aria-label="Tópicos"
                value={selectedTopico}
                onChange={(event) => {
                  setSelectedTopico(event.target.value)
                  if (event.target.value) setSelectedDificuldade('')
                }}
              >
                <option value="">Todos os tópicos</option>
                {topicos.map((topico) => (
                  <option key={topico.id_t} value={topico.id_t}>
                    {topico.nome_t} ({topico.total})
                  </option>
                ))}
              </select>

              {/* SELECT: Dificuldade */}
              <select
                aria-label="Dificuldade"
                value={selectedDificuldade}
                onChange={(event) => {
                  setSelectedDificuldade(event.target.value)
                  if (event.target.value) setSelectedTopico('')
                }}
              >
                <option value="">Todas as dificuldades</option>
                {dificuldades.map((dificuldade) => (
                  <option key={dificuldade.id_d} value={dificuldade.id_d}>
                    {dificuldade.nome_d} ({dificuldade.total})
                  </option>
                ))}
              </select>

              {/* INPUT: Campo de busca */}
              <input
                type="text"
                placeholder={
                  selectedTopico || selectedDificuldade
                    ? 'Buscar dentro do filtro selecionado'
                    : searchType === 'ano'
                    ? 'Digite o ano (ex: 2021)'
                    : searchType === 'vestibular'
                    ? 'Digite o nome do vestibular (ex: ENEM)'
                    : 'Digite o ID da questão'
                }
                value={termoBusca}
                onChange={(event) => setTermoBusca(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') buscarQuestao()
                }}
              />

              {/* BOTÃO: Buscar */}
              <button className="btn btn-primary" type="button" onClick={buscarQuestao}>
                Buscar
              </button>
            </div>
          </div>

          {/* ====================== SEÇÃO DA QUESTÃO ====================== */}
          <section className="form-section">
            <h2>
              {questaoAtual ? `Questão ${questaoAtual.id_q}` : 'Carregando questão...'}
              {questaoAtual?.nome_q && <span> ({questaoAtual.nome_q})</span>}
            </h2>

            <div className="question-meta">
              {questaoAtual?.dificuldade && (
                <span className="difficulty-label">
                  Dificuldade: {questaoAtual.dificuldade}
                </span>
              )}
            </div>

            <div className="question-text">
              {questaoAtual ? (
                limparEnunciado(questaoAtual.enunciado_q)
                  .split('\n')
                  .filter(Boolean)
                  .map((linha, index) => <p key={`${linha}-${index}`}>{linha}</p>)
              ) : (
                <p>Aguardando dados do servidor.</p>
              )}
            </div>

            {/* Alternativas ou campo de texto */}
            {alternativas.length > 0 ? (
              <div className="options-list">
                {alternativas.map((alternativa) => {
                  const estado =
                    resultado?.correta === alternativa.letra
                      ? ' correct'
                      : resultado &&
                          alternativaSelecionada === alternativa.letra &&
                          resultado.correta !== alternativa.letra
                        ? ' incorrect'
                        : alternativaSelecionada === alternativa.letra
                          ? ' selected'
                          : ''

                  return (
                    <button
                      className={`btn btn-outline-primary option-btn${estado}`}
                      data-option={alternativa.letra}
                      disabled={Boolean(resultado)}
                      key={alternativa.letra}
                      type="button"
                      onClick={() => setAlternativaSelecionada(alternativa.letra)}
                    >
                      <strong>{alternativa.letra})</strong> {alternativa.texto}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-answer-box">
                <label htmlFor="resposta-escrita" className="text-answer-label">
                  Resposta escrita
                </label>
                <textarea
                  id="resposta-escrita"
                  value={textoResposta}
                  onChange={(event) => setTextoResposta(event.target.value)}
                  placeholder="Escreva sua resposta aqui"
                  rows={6}
                />
              </div>
            )}

            {/* ====================== BOTÕES PRINCIPAIS ====================== */}
            <div className="form-buttons">
              {/* Botão Confirmar resposta */}
              <button className="btn btn-primary" type="button" onClick={confirmarResposta}>
                Confirmar resposta
              </button>
              {/* Botão Próxima questão */}
              <button className="btn btn-secondary" type="button" onClick={proximaQuestao}>
                Próxima questão
              </button>
            </div>
          </section>

          {/* ====================== SEÇÃO DO COMENTÁRIO ====================== */}
          <section className="list-section">
            <h2>Comentário do professor</h2>
            <div className="comment-box">
              {resultado ? (
                <>
                  <p>
                    <strong>Sua resposta:</strong> {resultado.enviado || alternativaSelecionada}
                  </p>
                  {questaoAtual?.id_q !== 2 && (
                    <p>
                      <strong>Resposta correta:</strong> {resultado.correta}
                    </p>
                  )}
                  <p>
                    <strong>Comentário do professor:</strong>
                    <br />
                    {resultado.comentario}
                  </p>
                </>
              ) : (
                <p>
                  <strong>Aguardando sua resposta...</strong>
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer>
        <p>© 2026 - Suricateam | Moléculas em Prova</p>
      </footer>
    </>
  )
}

export default Questoes