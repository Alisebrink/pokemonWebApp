import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { AllPokemons } from "./pages/AllPokemons";
import { MyCollection } from "./pages/MyCollection";
import { PokemonInfo } from "./pages/PokemonInfo";
import { Navbar } from './components/Navbar'
import { Navbar as NavbarBs } from 'react-bootstrap'
import './app.css'

export function App() {
  return (
    <div>
      <NavbarBs className="shadow-sm p-3" sticky="top" style={{ background: "#FFD73E"}}>
        <h1 className="font-weight-bold">Pokemon WebApp</h1>
      </NavbarBs>

      <Container className="shadow p-5" style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar pokemons={pokemonData} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon/all-pokemons" element={<AllPokemons />}></Route>
        <Route path="/pokemon/:name" element={<PokemonInfo/>}></Route>
        <Route path="/my-pokemons" element={<MyCollection />}></Route>
        
      </Routes>
      </Container>
    </div>
  );
}
