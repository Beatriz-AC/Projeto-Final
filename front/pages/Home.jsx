function Home() {
  return (
    <>
      <section className="subtitulo">
        <h1>
          Domine Quimica
          <br />
          para o <span>Vestibular</span>
        </h1>
        <p>
          Site completo, exercícios explicados e simulados focados no que
          realmente cai nos vestibulares.
        </p>
      </section>

      <main className="main">
        <section className="titulo-destaque">
          <h2>Questão em destaque (ENEM 2021)</h2>
          <p className="questao-destaque">
            O ácido acetilsalicílico, conhecido como aspirina, pode ser
            produzido a partir da reação entre o ácido salicílico e o anidrido
            acético, conforme a equação:
          </p>

          <div className="equacao">
            C<sub>7</sub>H<sub>8</sub>O<sub>3</sub> + (CH<sub>3</sub>CO)
            <sub>2</sub>O --&gt; C<sub>9</sub>H<sub>8</sub>O<sub>4</sub> +
            CH<sub>3</sub>COOH
          </div>

          <p className="question-prompt">
            Nessa reação, a função orgânica do produto formado é:
          </p>

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

        <aside className="informacoes">
          <h3>Por que estudar com a gente?</h3>
          <ul className="info-topicos">
            <li><span>✓</span> Conteúdo focado no que cai</li>
            <li><span>✓</span> Linguagem simples e direta</li>
            <li><span>✓</span> Questões atualizadas</li>
          </ul>
        </aside>
      </main>

      <section className="contatos">
        <h3>Fale com a gente</h3>
        <p>
          Tem dúvidas sobre os estudos ou a plataforma? Nossa equipe está
          pronta para ajudar.
        </p>
        <div className="contatos-info">
          <div className="contatos-topicos">
            <p>suricateam@quimicavestibular.com</p>
          </div>
          <div className="contatos-topicos">
            <p>(11) 99999-9999</p>
          </div>
          <div className="contatos-topicos">
            <p>Online / Brasil</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Suricateam</p>
      </footer>
    </>
  )
}

export default Home
