import Card from '../components/Card'

function Sobre() {
  const alunos = [
    { nome: 'Beatriz Almeida Conceição', foto: './img/Beatriz Foto.jpeg' },
    { nome: 'Lucas Octavio da Silva Castilho', foto: './img/Lucas Foto.jpg' },
    { nome: 'Mateus Carvalho Lopes', foto: './img/Mateus Foto.jpg' },
    { nome: 'Nicolas Fernando Dos Santos Januario', foto: './img/Nicolas Foto.jpg' },
    { nome: 'Otávio Grapeia Gesualdo ', foto: './img/Otávio Foto.jpg' },
  ]

  const professores = [
    { nome: 'Professora SESI', foto: './img/Flavienne Sesi.jpeg' },
    { nome: 'Professora SENAI 1', foto: '/Assets/prof2.jpg' },
    { nome: 'Professora SENAI 2', foto: '/Assets/prof3.jpg' },
  ]

  return (
    <>
      <main className="about-page">
        <section className="people-section">
          <h1>Criadores</h1>
          <div className="people-grid">
            {alunos.map((pessoa) => (
              <Card key={pessoa.nome} nome={pessoa.nome} foto={pessoa.foto} />
            ))}
          </div>
        </section>

        <section className="people-section">
          <h1>Professores</h1>
          <div className="people-grid">
            {professores.map((pessoa, index) => (
              <Card key={`prof-${index}`} nome={pessoa.nome} foto={pessoa.foto} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Suricateam</p>
      </footer>
    </>
  )
}

export default Sobre
