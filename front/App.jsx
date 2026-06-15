import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Plano from './pages/Plano.jsx'
import Questoes from './pages/Questoes.jsx'
import Sobre from './pages/Sobre.jsx'


const routes = {
  '/': Home,
  '/home': Home,
  '/Home': Home,
  '/login': Login,
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
  const protectedPaths = ['/', '/home', '/plano', '/questoes']

  useEffect(() => {
    const handlePopState = () => setPath(getCurrentPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    async function validarLogin() {
      const token = localStorage.getItem('jwtToken')

      if (!token) {
        setIsAuthenticated(false)
        return
      }

      try {
        const response = await fetch('/auth/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          localStorage.removeItem('jwtToken')
          setIsAuthenticated(false)

          if (protectedPaths.includes(getCurrentPath().toLowerCase())) {
            window.history.replaceState({}, '', '/login')
            setPath('/login')
          }
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('jwtToken')
        setIsAuthenticated(false)
      }
    }

    validarLogin()
  }, [])

  function navigate(nextPath) {
    const normalizedPath = nextPath.toLowerCase()
    const token = localStorage.getItem('jwtToken')

    if ((!isAuthenticated || !token) && protectedPaths.includes(normalizedPath)) {
      window.history.pushState({}, '', '/login')
      setPath('/login')
      return
    }

    window.history.pushState({}, '', nextPath)
    setPath(getCurrentPath())
  }

  function handleLogout() {
    localStorage.removeItem('jwtToken')
    setIsAuthenticated(false)
    navigate('/login')
  }

  const effectivePath =
    !isAuthenticated && protectedPaths.includes(path.toLowerCase())
      ? '/login'
      : path
  const Page = routes[effectivePath] || Home
  const isLoginPage = effectivePath.toLowerCase() === '/login'

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
