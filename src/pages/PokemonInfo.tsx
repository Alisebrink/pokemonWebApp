import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import { PlusLg, ArrowLeft, Dash } from "react-bootstrap-icons";

type PokemonInfo = {
  id: number;
  name: string;
  height: string;
  abilities: {
    ability: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];

  sprites: {
    front_default: string;
  };
  stats: {
    stat: {
      name: string;
    };
  }[];
};

export function PokemonInfo() {
  let { name } = useParams();
  let [pokemonData, setPokemonData] = useState<PokemonInfo>();
  let [isLoading, setIsLoading] = useState(false);
  let [myPokemon, setMyPokemon] = useState<string[]>([]);

  let url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setPokemonData(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getPokemon();
  }, []);

  useEffect(() => {
    let storedPokemon = JSON.parse(localStorage.getItem("My Pokemons"));

    if (storedPokemon) {
      setMyPokemon(storedPokemon);
    }
  }, []);

  let handleAddClick = () => {
    if (!myPokemon.includes(pokemonData.name)) {
      const newArr = [...myPokemon, pokemonData.name];
      setMyPokemon(newArr);
      localStorage.setItem("My Pokemons", JSON.stringify(newArr));
      console.log(`${pokemonData?.name} was added to your array`);
    } else {
      console.log(`${pokemonData?.name} was already added to your array`);
    }
  };

  let handleDeleteClick = () => {
    const newArr = myPokemon.filter((item) => item !== pokemonData?.name);
    setMyPokemon(newArr);
    localStorage.setItem("My Pokemons", JSON.stringify(newArr));
    console.log(`${pokemonData?.name} is removed from your array`);
  };

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
        <div className="row">
          <div className="col-7 d-grid">
            <div className="row"></div>
            <h2 className="capitalize heading2 row col-12 justify-content-center">
              {pokemonData?.name} #{pokemonData?.id}
            </h2>
            <p
              style={{ textAlign: "center" }}
              className="capitalize col-12 justify-content-center"
              key={pokemonData?.name}
            >
              Types:&nbsp;
              {pokemonData?.types.map((i: any) => (
                <span key={i.type.name}>{i.type.name}, </span>
              ))}
            </p>
            <div
              className="row justify-content-center"
              style={{ textAlign: "center" }}
            >
              <p className="col-4">Height: {pokemonData?.height}</p>
              {pokemonData?.stats.map((i: any) => (
                <p className="capitalize col-3" key={i.stat.name}>
                  {i.stat.name}: {i.base_stat}
                </p>
              ))}
            </div>
            <div
              className="row gap-3 justify-content-center"
              style={{ maxHeight: "40px" }}
            >
              <Button
                className="yellow col-4"
                as={NavLink}
                to="/pokemon/all-pokemons"
              >
                <ArrowLeft />
                &nbsp;&nbsp;Go back
              </Button>
              <Button
                onClick={handleAddClick}
                className="yellow col-4"
                as={NavLink}
              >
                Add &nbsp;&nbsp;
                <PlusLg />
              </Button>
              <Button
                onClick={handleDeleteClick}
                className="yellow col-4"
                as={NavLink}
              >
                Remove &nbsp;&nbsp;
                <Dash />
              </Button>
            </div>
            <div className="row"></div>
            <div className="row"></div>
          </div>
          <div className="col-5">
            <Card className="border-0">
              <Card.Img
                style={{ background: "#eeeeec" }}
                src={pokemonData?.sprites.front_default}
              />
            </Card>
            {myPokemon}
          </div>
        </div>
      )}
    </>
  );
}
