import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Plano from './pages/Plano.jsx'
import Questoes from './pages/Questoes.jsx'
import Sobre from './pages/Sobre.jsx'
import Cadastro from './pages/Cadastro.jsx'

const routes = {
  '/': Home,
  '/home': Home,
  '/Home': Home,
  '/login': Login,
  '/cadastro': Cadastro,
  '/questoes': Questoes,
  '/plano': Plano,
  '/sobre': Sobre,
}

function getCurrentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function App() {
  const [path, setPath] = useState(getCurrentPath)
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem('jwtToken')),
  )

  useEffect(() => {
    const handlePopState = () => setPath(getCurrentPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(nextPath) {
    window.history.pushState({}, '', nextPath)
    setPath(getCurrentPath())
  }

  function handleLogout() {
    localStorage.removeItem('jwtToken')
    setIsAuthenticated(false)
    navigate('/login')
  }

  const Page = routes[path] || Home
  const isLoginPage = path.toLowerCase() === '/login'

  return (
    <div className="app-shell">
      {!isLoginPage && (
        <Navbar
          isAuthenticated={isAuthenticated}
          onNavigate={navigate}
          onLogout={handleLogout}
        />
      )}
      <Page
        isAuthenticated={isAuthenticated}
        onLogin={() => setIsAuthenticated(true)}
        onNavigate={navigate}
      />
    </div>
  )
}

export default App
