function Home() {
  return (
    <>
      {/* ====================== HERO / SEÇÃO PRINCIPAL ====================== */}
      {/* Esta é a seção de destaque no topo da página (hero) */}
      <section className="subtitulo">
        <h1>
          Domine Química
          <br />
          para o <span>Vestibular</span>
        </h1>
        <p>
          Site completo, exercícios explicados e simulados focados no que
          realmente cai nos vestibulares.
        </p>
      </section>

      {/* ====================== CONTEÚDO PRINCIPAL ====================== */}
      {/* Main agrupa o conteúdo central da página */}
      <main className="main">
        
        {/* ====================== QUESTÃO EM DESTAQUE ====================== */}
        {/* Seção que mostra uma questão importante do ENEM */}
        <section className="titulo-destaque">
          
          {/* Título da seção da questão */}
          <h2>Questão em destaque (ENEM 2021)</h2>
          
          {/* Enunciado da questão */}
          <p className="questao-destaque">
            O ácido acetilsalicílico, conhecido como aspirina, pode ser
            produzido a partir da reação entre o ácido salicílico e o anidrido
            acético, conforme a equação:
          </p>

          {/* Equação química formatada com subscritos */}
          <div className="equacao">
            C<sub>7</sub>H<sub>8</sub>O<sub>3</sub> + (CH<sub>3</sub>CO)
            <sub>2</sub>O → C<sub>9</sub>H<sub>8</sub>O<sub>4</sub> + CH<sub>3</sub>COOH
          </div>

          {/* Pergunta específica sobre a função orgânica */}
          <p className="question-prompt">
            Nessa reação, a função orgânica do produto formado é:
          </p>

          {/* Container com as alternativas de resposta */}
          <div className="alternativas-destaque">
            <button className="opcoes" type="button">
              (A) Ácido carboxílico
            </button>
            <button className="opcoes" type="button">
              (B) Éster
            </button>
            <button className="opcoes" type="button">
              (C) Fenol
            </button>
            <button className="opcoes" type="button">
              (D) Aldeído
            </button>
            <button className="opcoes" type="button">
              (E) Cetona
            </button>
          </div>
        </section>

        {/* ====================== SIDEBAR / INFORMAÇÕES LATERAL ====================== */}
        {/* Aside geralmente usado para conteúdo complementar (benefícios) */}
        <aside className="informacoes">
          <h3>Por que estudar com a gente?</h3>
          
          {/* Lista de benefícios */}
          <ul className="info-topicos">
            <li><span>✓</span> Conteúdo focado no que cai</li>
            <li><span>✓</span> Linguagem simples e direta</li>
            <li><span>✓</span> Questões atualizadas</li>
          </ul>
        </aside>

      </main>

      {/* ====================== SEÇÃO DE CONTATO ====================== */}
      {/* Seção dedicada a informações de contato */}
      <section className="contatos">
        <h3>Fale com a gente</h3>
        <p>
          Tem dúvidas sobre os estudos ou a plataforma? Nossa equipe está
          pronta para ajudar.
        </p>
        
        {/* Container com os dados de contato */}
        <div className="contatos-info">
          
          {/* E-mail */}
          <div className="contatos-topicos">
            <p>suricateam@quimicavestibular.com</p>
          </div>
          
          {/* Telefone */}
          <div className="contatos-topicos">
            <p>(11) 99999-9999</p>
          </div>
          
          {/* Localização / Disponibilidade */}
          <div className="contatos-topicos">
            <p>Online / Brasil</p>
          </div>
        </div>
      </section>

      {/* ====================== RODAPÉ ====================== */}
      {/* Footer com informações de copyright */}
      <footer>
        <p>© 2026 Suricateam</p>
      </footer>
    </>
  )
}

export default Home