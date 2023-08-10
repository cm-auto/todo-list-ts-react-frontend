import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import Contact from './components/contact'
import Navbar from './components/navbar'
import ListPage from './pages/list-page'
import "./App.css"

function App() {
  return (
	<>
    <Router>
		<Navbar/>
		<div className='routes-wrapper'>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/about" Component={About} />
                <Route path="/contact" Component={Contact} />
                <Route path="/lists/:id" Component={ListPage} />
            </Routes>
        </div>
    </Router>
	</>
  )
}

export default App
