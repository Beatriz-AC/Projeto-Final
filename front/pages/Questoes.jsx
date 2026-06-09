import { useEffect, useMemo, useState } from 'react'

function normalizarTexto(texto) {
  return String(texto || '').replace(/\\n/g, '\n')
}

function extrairAlternativas(enunciado) {
  const texto = normalizarTexto(enunciado)
  const alternativas = []
  const regex = /\(([A-E])\)\s*(.+?)(?=\n\([A-E]\)|$)/gs
  let match

  while ((match = regex.exec(texto)) !== null) {
    alternativas.push({
      letra: match[1],
      texto: match[2].trim(),
    })
  }

  return alternativas
}

function limparEnunciado(enunciado) {
  return normalizarTexto(enunciado).replace(/\n\([A-E]\).+?(?=\n\([A-E]\)|$)/gs, '')
}

function Questoes() {
  const [questoes, setQuestoes] = useState([])
  const [questaoAtual, setQuestaoAtual] = useState(null)
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [topicos, setTopicos] = useState([])
  const [selectedTopico, setSelectedTopico] = useState('')
  const [searchType, setSearchType] = useState('id')
  const [termoBusca, setTermoBusca] = useState('')
  const [alternativaSelecionada, setAlternativaSelecionada] = useState('')
  const [textoResposta, setTextoResposta] = useState('')
  const [resultado, setResultado] = useState(null)
  const [modalMessage, setModalMessage] = useState('')

  const alternativas = useMemo(
    () => extrairAlternativas(questaoAtual?.enunciado_q),
    [questaoAtual],
  )

  async function carregarQuestoes() {
    try {
      const response = await fetch('/busca')
      const data = await response.json()
      const sorted = Array.isArray(data)
        ? [...data].sort((a, b) => Number(a.id_q) - Number(b.id_q))
        : []

      setQuestoes(sorted)
      setIndiceAtual(0)
      setQuestaoAtual(sorted[0] || null)
      setSelectedTopico('')
      setSearchType('id')
      setTermoBusca('')
      setAlternativaSelecionada('')
      setTextoResposta('')
      setResultado(null)
    } catch (error) {
      setModalMessage('Erro ao carregar as questões.')
    }
  }

  async function carregarTopicos() {
    try {
      const response = await fetch('/busca/topicos-lista')
      const data = await response.json()
      setTopicos(data)
    } catch (error) {
      setTopicos([])
    }
  }

  async function buscarPorTopico(topicoId) {
    try {
      const response = await fetch(`/busca/topicos/${topicoId}`)
      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) {
        setModalMessage('Nenhuma questão encontrada para este tópico.')
        return
      }
      const sorted = [...data].sort((a, b) => Number(a.id_q) - Number(b.id_q))
      setQuestoes(sorted)
      setQuestaoAtual(sorted[0])
      setIndiceAtual(0)
      setAlternativaSelecionada('')
      setResultado(null)
    } catch (error) {
      setModalMessage('Erro ao buscar por tópico.')
    }
  }

  useEffect(() => {
    carregarTopicos()
    carregarQuestoes()
  }, [])

  function selecionarQuestao(questao, indice = indiceAtual) {
    setQuestaoAtual(questao)
    setIndiceAtual(indice)
    setAlternativaSelecionada('')
    setTextoResposta('')
    setResultado(null)
  }

  async function buscarQuestao() {
    const termo = termoBusca.trim()

    if (!termo && !selectedTopico) {
      setModalMessage('Digite o termo de busca ou selecione um tópico.')
      return
    }

    if (selectedTopico) {
      await buscarPorTopico(selectedTopico)
      return
    }

    const termoLower = termo.toLowerCase()

    if (searchType === 'id') {
      const index = questoes.findIndex((questao) => String(questao.id_q) === termo)
      if (index >= 0) {
        selecionarQuestao(questoes[index], index)
        return
      }
      setModalMessage('Nenhuma questão encontrada para este ID.')
      return
    }

    if (searchType === 'ano') {
      const response = await fetch(`/busca/ano/${encodeURIComponent(termo)}`)
      if (!response.ok) {
        setModalMessage('Nenhuma questão encontrada para este ano.')
        return
      }
      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) {
        setModalMessage('Nenhuma questão encontrada para este ano.')
        return
      }
      const sorted = [...data].sort((a, b) => Number(a.id_q) - Number(b.id_q))
      setQuestoes(sorted)
      setQuestaoAtual(sorted[0])
      setIndiceAtual(0)
      setAlternativaSelecionada('')
      setResultado(null)
      return
    }

    if (searchType === 'vestibular') {
      const response = await fetch(`/busca/vestibular/${encodeURIComponent(termo)}`)
      if (!response.ok) {
        setModalMessage('Nenhuma questão encontrada para este vestibular.')
        return
      }
      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) {
        setModalMessage('Nenhuma questão encontrada para este vestibular.')
        return
      }
      const sorted = [...data].sort((a, b) => Number(a.id_q) - Number(b.id_q))
      setQuestoes(sorted)
      setQuestaoAtual(sorted[0])
      setIndiceAtual(0)
      setAlternativaSelecionada('')
      setResultado(null)
      return
    }

    const index = questoes.findIndex(
      (questao) =>
        String(questao.id_q) === termo ||
        questao.enunciado_q?.toLowerCase().includes(termoLower),
    )

    if (index >= 0) {
      selecionarQuestao(questoes[index], index)
      return
    }

    setModalMessage('Nenhuma questão encontrada.')
  }

  function proximaQuestao() {
    if (questoes.length === 0) return

    const proximoIndice = (indiceAtual + 1) % questoes.length
    selecionarQuestao(questoes[proximoIndice], proximoIndice)
  }

  async function confirmarResposta() {
    if (!questaoAtual) return

    if (alternativas.length > 0) {
      if (!alternativaSelecionada) {
        setModalMessage('Por favor, selecione uma alternativa.')
        return
      }
    } else {
      if (!textoResposta.trim()) {
        setModalMessage('Escreva sua resposta antes de enviar.')
        return
      }
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
        setModalMessage(message)
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
      setModalMessage(error.message || 'Erro ao buscar a resposta correta.')
    }
  }

  return (
    <>
      <main className="questoes-page">
        <div className="container">
          <div className="list-controls">
            <button className="btn btn-success" type="button" onClick={carregarQuestoes}>
              Recarregar lista
            </button>

            <div className="search-box">
              <select
                aria-label="Buscar por"
                value={searchType}
                onChange={(event) => setSearchType(event.target.value)}
              >
                <option value="id">Buscar por ID</option>
                <option value="ano">Buscar por ano</option>
                <option value="vestibular">Buscar por vestibular</option>
              </select>

              <select
                aria-label="Tópicos"
                value={selectedTopico}
                onChange={(event) => setSelectedTopico(event.target.value)}
              >
                <option value="">Todos os tópicos</option>
                {topicos.map((topico) => (
                  <option key={topico.id_t} value={topico.id_t}>
                    {topico.nome_t} ({topico.total})
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={
                  selectedTopico
                    ? 'Buscar dentro do tópico selecionado'
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
              <button className="btn btn-primary" type="button" onClick={buscarQuestao}>
                Buscar
              </button>
            </div>
          </div>

          <section className="form-section">
            <h2>
              {questaoAtual ? `Questão ${questaoAtual.id_q}` : 'Carregando questão...'}
              {questaoAtual?.nome_q && <span> ({questaoAtual.nome_q})</span>}
            </h2>

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

            <div className="form-buttons">
              <button className="btn btn-primary" type="button" onClick={confirmarResposta}>
                Confirmar resposta
              </button>
              <button className="btn btn-secondary" type="button" onClick={proximaQuestao}>
                Próxima questão
              </button>
            </div>
          </section>

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

      {modalMessage && (
        <div className="modal-message">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button className="btn btn-primary" type="button" onClick={() => setModalMessage('')}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Questoes
