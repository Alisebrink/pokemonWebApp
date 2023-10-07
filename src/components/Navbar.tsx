import { NavLink } from "react-router-dom";
import { Navbar as NavbarBs, Nav, Form } from "react-bootstrap";
import { useState, useEffect } from 'react'

export function Navbar({props}) {

  const { pokemonData } = props

  let [pokemons, setPokemons] = useState([])
  let [query, setQuery] = useState("");

  useEffect(() => {
  setPokemons(pokemonData)
  })

  return (
    <NavbarBs className="mb-4 navigation">
      <Nav className="me-auto gap-5">
        <Nav.Link to="/" as={NavLink}>
          Home
        </Nav.Link>
        <Nav.Link to="/pokemon/all-pokemons" as={NavLink}>
          All pokemons
        </Nav.Link>
        <Nav.Link to="/my-pokemons" as={NavLink}>
          My Collection
        </Nav.Link>
      </Nav>
      {location.pathname === "/pokemon/all-pokemons" ? (
        <form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Type search here.."
            className="me-2"
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </form>
      ) : (
        ""
      )}
    </NavbarBs>
  );
}
