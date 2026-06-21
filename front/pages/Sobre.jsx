import Card from '../components/Card'

function Sobre() {

  // ====================== DADOS DOS ALUNOS ======================
  // Lista de alunos criadores do projeto
  const alunos = [
    { nome: 'Beatriz Almeida Conceição', foto: './img/Beatriz Foto.jpeg' },
    { nome: 'Lucas Octavio da Silva Castilho', foto: './img/Lucas Foto.jpg' },
    { nome: 'Mateus Carvalho Lopes', foto: './img/Mateus Foto.jpg' },
    { nome: 'Nicolas Fernando Dos Santos Januario', foto: './img/Nicolas Foto.jpg' },
    { nome: 'Otávio Grapeia Gesualdo ', foto: './img/Otávio Foto.jpg' },
  ]

  // ====================== DADOS DOS PROFESSORES ======================
  // Lista de professores/orientadores
  const professores = [
    { nome: 'Professora SESI', foto: './img/Flavienne Sesi.jpeg' },
  ]

  // ====================== INTERFACE (JSX) ======================
  return (
    <>
      {/* ====================== PÁGINA PRINCIPAL ====================== */}
      <main className="about-page">
        
        {/* ====================== SEÇÃO DOS ALUNOS ====================== */}
        <section className="people-section">
          <h1>Criadores</h1>
          
          {/* Grid com cards dos alunos */}
          <div className="people-grid">
            {alunos.map((pessoa) => (
              <Card 
                key={pessoa.nome} 
                nome={pessoa.nome} 
                foto={pessoa.foto} 
              />
            ))}
          </div>
        </section>

        {/* ====================== SEÇÃO DA PROFESSORA ====================== */}
        <section className="people-section">
          <h1>Professora</h1>
          
          {/* Grid com card da professora */}
          <div className="people-grid">
            {professores.map((pessoa, index) => (
              <Card 
                key={`prof-${index}`} 
                nome={pessoa.nome} 
                foto={pessoa.foto} 
              />
            ))}
          </div>
        </section>

      </main>

      {/* ====================== RODAPÉ ====================== */}
      <footer>
        <p>© 2026 Suricateam</p>
      </footer>
    </>
  )
}

export default Sobre