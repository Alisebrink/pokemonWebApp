import { useState, useEffect } from "react";

export function MyCollection() {
  let [myPokemon, setMyPokemon] = useState<string[]>([]);
  useEffect(() => {
    let myPokemon = JSON.parse(localStorage.getItem("My Pokemons"));

    if (myPokemon) {
      setMyPokemon(myPokemon);
    }
  }, []);
  return (
    <>
      <h1>My collection</h1>
      <p className="capitalize">{myPokemon}</p>
    </>
  );
}
