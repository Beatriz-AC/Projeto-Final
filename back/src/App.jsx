import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <section className="hero">
        <h1>Projeto Final</h1>
        <p>Este projeto contém uma API Express e um frontend React/Vite.</p>
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          Clique {count} vezes
        </button>
      </section>
      <section className="info">
        <p>
          Rota de login: <code>/auth/login</code>
        </p>
        <p>
          Rota de busca: <code>/busca</code>
        </p>
      </section>
    </main>
  )
}

export default App
