import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Filtering } from "../components/Filtering";
import { NavLink } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

type pokemons = {
  config: {
    url: string;
  };
  data: {
    id: number;
    name: string;
    url: string;
    types: {
      [type: string]: {
        name: string;
      };
    };
    sprites: {
      front_default: string;
    };
  };
};

export function AllPokemons() {
  // Sätter min data till en array
  let [pokemonData, setPokemonData] = useState<pokemons[]>([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);
      try {
        let allPokemon = [];
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        let urls = response.data.results;
        allPokemon = await Promise.all(
          urls.map(async (uri: any) => {
            return await axios.get(uri.url);
          })
        );
        setPokemonData(allPokemon);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getPokemon();
  }, []);

  return (
    <>
      {isLoading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      ) : (
        <>
          <Filtering pokemonData={pokemonData} />
          <div className="pokemon-container">
            {pokemonData.map((i) => (
              <NavLink key={i.data.id} to={`/pokemon/${i.data.name}`}>
                <Card
                  className={`${i.data.types[0].type.name}-border shadow-sm rounded`}
                >
                  <Card.Text className="p-2 mb-0">#{i.data.id}</Card.Text>
                  <Card.Img src={i.data.sprites.front_default} />
                  <Card.Text className="mb-1">
                    Type: {i.data.types[0].type.name}
                  </Card.Text>
                  <Card.Header
                    className={`border-bottom-0 ${i.data.types[0].type.name}`}
                  >
                    {i.data.name}
                  </Card.Header>
                </Card>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </>
  );
}
