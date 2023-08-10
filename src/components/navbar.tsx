import { Link } from 'react-router-dom'

function Navbar() {
	return (
	  <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                {/* <img src="/vite.svg" width="32" height="32"></img> */}
                <span className="material-icons" style={{"fontSize": "32px", "color": "green"}}>check</span>
              </Link>

              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/about" className="navbar-item">About</Link>
                <Link to="/contact" className="navbar-item">Contact</Link>
              </div>
            </div>
          </nav>
	)
  }

export default Navbar
