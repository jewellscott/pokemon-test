import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

// manage state

const [pokemon, setPokemon ] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const getPokemon = async () => { // fetch data with error handling
    try {
       const res = await fetch('https://pokeapi.co/api/v2/pokemon/');

       if (!res.ok) { // handles error for wrong/nonexistent endpoints
         throw new Error(
           `This is an HTTP error: The status is ${res.status}`
         );
       }
       
       let pokemonData = await res.json();
       setPokemon(pokemonData);
       setError(null);
    } catch(err) { // handles network errors
      setError(err.message);
      setPokemon(null);
    } finally { // runs when the promise settles
      setLoading(false);
    }
  }
  getPokemon();
}, []);



  return (
    <div className="App">
      <header>
        <h1>Pokédex</h1>
        <p>Find any Pokémon and its moves!</p>
        {loading && <p>Loading...</p>}
        {error && (
          <div>
            {`Oops! There's a problem fetching your Pokémon data - ${error}`}
          </div>
       )}
      </header>
      <main>
        <ul>
          {
            Object.values(pokemon).map((name, sprites, moves, move, index) => {
              return (
                <li key={index}>
                  <img src={sprites.front_default} alt="" />
                  <h2>{name}</h2>
                  <ul>
                    {/* how to do nested maps? */}
                    <li>{moves.move.name}</li>
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
