import { useState } from 'react'

function Login({ onLogin, onNavigate }) {
  
  // ====================== ESTADOS (States) ======================
  // Gerenciam os dados do formulário e o comportamento da tela
  const [email, setEmail] = useState('')           // Armazena o e-mail digitado
  const [password, setPassword] = useState('')     // Armazena a senha digitada
  const [message, setMessage] = useState('')       // Mensagem de feedback (sucesso ou erro)
  const [isSuccess, setIsSuccess] = useState(false)// Controla se a mensagem é de sucesso
  const [isSubmitting, setIsSubmitting] = useState(false) // Controla o estado de carregamento

  // ====================== FUNÇÃO AUXILIAR ======================
  // Exibe mensagem de feedback para o usuário
  function showMessage(text, success = false) {
    setMessage(text)
    setIsSuccess(success)
  }

  // ====================== ENVIO DO FORMULÁRIO ======================
  // Função principal que trata o login
  async function handleSubmit(event) {
    event.preventDefault()   // Evita o recarregamento da página

    // Validação simples dos campos
    if (!email.trim() || !password.trim()) {
      showMessage('Preencha e-mail e senha.')
      return
    }

    setIsSubmitting(true)    // Ativa o estado de carregamento

    try {
      // Requisição para a API de login
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      })

      const data = await response.json()

      // Login bem-sucedido
      if (data.sucesso) {
        localStorage.setItem('jwtToken', data.token)  // Salva o token JWT
        onLogin()                                     // Atualiza estado de autenticação no App
        showMessage('Login realizado com sucesso!', true)
        
        // Redireciona para a home após 800ms
        window.setTimeout(() => onNavigate('/home'), 800)
      } else {
        showMessage(data.mensagem || 'E-mail ou senha incorretos.')
      }
    } catch (error) {
      showMessage('Erro ao conectar com o servidor.')
    } finally {
      setIsSubmitting(false)   // Desativa o estado de carregamento
    }
  }

  // ====================== INTERFACE (JSX) ======================
  return (
    <main className="login-page">
      
      <section className="login-container">
        
        {/* Título principal */}
        <h1>Login</h1>
        <p className="subtitle">Autenticação</p>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit}>
          
          {/* Campo de E-mail */}
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {/* Campo de Senha */}
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {/* Botão de submit */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Área de mensagem de feedback */}
        <div className={isSuccess ? 'message success' : 'message'}>
          {message}
        </div>

      </section>
    </main>
  )
}

export default Login