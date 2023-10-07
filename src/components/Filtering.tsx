import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function Filtering() {
  type pokemontype = {
    data: {
      name: string;
      id: number;
    };
  };

  let [pokemonType, setPokemonType] = useState<pokemontype[]>([]);

  useEffect(() => {
    const getPokemonType = async () => {
      try {
        let allPokemonTypes = [];
        const response = await axios.get("https://pokeapi.co/api/v2/type/");
        let urls = response.data.results;
        allPokemonTypes = await Promise.all(
          urls.map(async (uri: any) => {
            return await axios.get(uri.url);
          })
        );
        setPokemonType(allPokemonTypes);
      } catch (err) {
        console.log(err);
      }
    };
    getPokemonType();
  }, []);

  return (
    <>
      <div className="mb-4 d-flex gap-3 position-relative">
          <Dropdown>
            <Dropdown.Toggle className="yellow" id="dropdown-basic">
              Type
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow">
              {pokemonType.map((i) => (
                <Dropdown.Item className="capitalize" key={i.data.id}>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">{i.data.name}</label>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle className="yellow" id="dropdown-basic">
              Generation
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="position-absolute" style={{right: "0"}}>
            <Dropdown.Toggle className="yellow" id="dropdown-basic">
              Sort by: Pokedex
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Name</Dropdown.Item>
              <Dropdown.Item>Pokedex number</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
    </>
  );
}
