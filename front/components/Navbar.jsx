import logo from '../public/Assets/logo_do_site.png'

function Navbar({ isAuthenticated, onLogout, onNavigate }) {
  function handleNavigate(event, path) {
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <header className="navbar">
      <a className="logo" href="/home" onClick={(event) => handleNavigate(event, '/home')}>
        <img src={logo} alt="Moléculas em Prova" className="logo-img" />
      </a>

      <nav aria-label="Navegação principal">
        <ul className="nav-links">
          <li>
            <a href="/home" onClick={(event) => handleNavigate(event, '/home')}>
              Home
            </a>
          </li>
          <li>
            <a href="/questoes" onClick={(event) => handleNavigate(event, '/questoes')}>
              Questões
            </a>
          </li>
          <li>
            <a href="/plano" onClick={(event) => handleNavigate(event, '/plano')}>
              Plano de estudos
            </a>
          </li>
          <li>
            <a href="/sobre" onClick={(event) => handleNavigate(event, '/sobre')}>
              Sobre
            </a>
          </li>
          {!isAuthenticated && (
            <li>
              <a href="/login" onClick={(event) => handleNavigate(event, '/login')}>
                Entrar
              </a>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button className="btn-logout" type="button" onClick={onLogout}>
                Sair
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
