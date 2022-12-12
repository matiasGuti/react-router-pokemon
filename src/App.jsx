import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import Home from './assets/views/Home';
import Pokemon from './assets/views/Pokemon';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/pokemon' element={<Pokemon />}>
            <Route path=':pokemonName' element={<Pokemon />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
