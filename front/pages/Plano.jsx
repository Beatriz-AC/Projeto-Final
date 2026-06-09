function Plano() {
  const diasEstudo = [
    {
      dia: 'Segunda',
      tema: 'Ligações Químicas',
      topicos: [
        'Tipos: iônica, covalente e metálica',
        'Regra do octeto',
        'Polaridade das ligações',
        'Onde estudar: aulas no YouTube + resumo no caderno',
      ],
    },
    {
      dia: 'Terça',
      tema: 'Estequiometria',
      topicos: [
        'Mol e massa molar',
        'Balanceamento de equações',
        'Cálculos simples (regra de 3)',
        'Prática: exercícios',
      ],
    },
    {
      dia: 'Quarta',
      tema: 'Termoquímica',
      topicos: [
        'Conceito de calor (endo e exotérmica)',
        'Entalpia',
        'Lei de Hess (básico)',
        'Onde estudar: teoria + exercícios leves',
      ],
    },
    {
      dia: 'Quinta',
      tema: 'Soluções',
      topicos: [
        'Concentração (g/L, mol/L)',
        'Diluição',
        'Misturas',
        'Prática: exercícios',
      ],
    },
    {
      dia: 'Sexta',
      tema: 'Equilíbrio Químico',
      topicos: [
        'Conceito de equilíbrio',
        'Constante (Kc)',
        'Princípio de Le Chatelier',
        'Onde estudar: teoria + exemplos',
      ],
    },
    {
      dia: 'Sábado',
      tema: 'Eletroquímica',
      topicos: [
        'Pilhas e baterias',
        'Ânodo e cátodo',
        'Oxidação e redução',
        'Prática: exercícios',
      ],
    },
    {
      dia: 'Domingo',
      tema: 'Revisão + Temas Teóricos',
      topicos: [
        'Química Orgânica: cadeias carbônicas, funções orgânicas',
        'Ciclo do Carbono: etapas e importância',
        'Química Inorgânica: ácidos, bases, sais e óxidos',
        'Revisão geral da semana',
      ],
    },
  ]

  const dicas = [
    'Estude 1h de teoria e 1h de exercícios',
    'Revise o conteúdo anterior por 10 minutos',
    'Foque mais em exercícios nas matérias de cálculo',
  ]

  return (
    <>
      <section className="page-hero">
        <h1>Plano de estudos</h1>
        <p>Plano de Estudo de Química (2h por dia)</p>
      </section>

      <main className="study-page">
        <div className="days-grid">
          {diasEstudo.map((dia, index) => (
            <article className="day-card" key={index}>
              <h3 className="day-header">{dia.dia}</h3>
              <h4 className="day-theme">{dia.tema}</h4>
              <ul className="day-topics">
                {dia.topicos.map((topico, idx) => (
                  <li key={idx}>{topico}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="tips-section">
          <h2>Dicas Importantes</h2>
          <ul className="tips-list">
            {dicas.map((dica, index) => (
              <li key={index}>{dica}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2026 Suricateam</p>
      </footer>
    </>
  )
}

export default Plano

