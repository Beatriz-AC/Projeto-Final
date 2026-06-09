import { useState } from 'react'

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nascimento: '',
    telefone: '',
    senha: '',
  })

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <>
      <main className="signup-page">
        <section className="signup-card">
          <h1>Cadastre - se</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Escreva seu nome completo"
              value={formData.nome}
              onChange={(event) => updateField('nome', event.target.value)}
            />

            <label htmlFor="cadastro-email">Email</label>
            <input
              id="cadastro-email"
              type="email"
              placeholder="Ex: site01@gmail.com"
              value={formData.email}
              onChange={(event) => updateField('email', event.target.value)}
            />

            <label htmlFor="nascimento">Data de Nascimento</label>
            <input
              id="nascimento"
              type="date"
              value={formData.nascimento}
              onChange={(event) => updateField('nascimento', event.target.value)}
            />

            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="tel"
              placeholder="Ex: (11) 12345-1234"
              value={formData.telefone}
              onChange={(event) => updateField('telefone', event.target.value)}
            />

            <label htmlFor="cadastro-senha">Senha</label>
            <input
              id="cadastro-senha"
              type="password"
              placeholder="Ex: Senha001"
              value={formData.senha}
              onChange={(event) => updateField('senha', event.target.value)}
            />

            <button type="submit">Enviar</button>
          </form>
        </section>
      </main>

      <footer>
        <p>© 2026 Suricateam</p>
      </footer>
    </>
  )
}

export default Cadastro
