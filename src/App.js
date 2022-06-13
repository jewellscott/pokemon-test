import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

// manage state

const [pokemon, setPokemon ] = useState([null]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const [formEntry, setFormEntry] = useState('Pikachu');

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

  const pokemonList = [pokemon].map((name, sprites) => (
    <li key={name}>
      <img src={sprites.front_default} alt=""></img>
      <h3>{name}</h3>
    </li>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formEntry);
  }

  return (
    <div className="App">
      <header>
        <h1>Pokédex</h1>
        <p>Find any Pokémon and its moves!</p>
        <form onSubmit={handleSubmit}>
          <input type="text" onInput={(e) => setFormEntry(e.target.value)}/>
          <input type="submit" value="Get my Pokémon!"/>
        </form>
        {loading && <p>Loading...</p>}
        {error && (
          <div>
            {`Oops! There's a problem fetching your Pokémon data - ${error}`}
          </div>
       )}
      </header>
      <main>
        <ul>
          {/* {pokemonList} */}
        </ul>
      </main>
    </div>
  );
}

export default App;
