import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

// manage state

const [ pokemon, setPokemon ] = useState('null')
const [ loading, setLoading ] = useState(true);
const [ error, setError ] = useState(null);

const [ formEntry, setFormEntry ] = useState('pikachu');
const [ pokemonSelection, setPokemonSelection ] = useState('pikachu')


useEffect(() => {
  const getPokemon = async () => { // fetch data with error handling
    try {
       const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSelection}`);

       if (!res.ok) { // handles error for wrong/nonexistent endpoints
         throw new Error(
           `Not a valid Pokémon! Try again. This is an HTTP error: The status is ${res.status}`
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
}, [pokemonSelection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonSelection(formEntry);
  }

  // const movesList = pokemon.moves.map((move, i) => (
  //   <li key={i}>{move}</li>
  // ));
 
  return (
    <div className="App">
      <header>
        <h1>Pokédex</h1>
        <p>Find any Pokémon and its moves!</p>
        <form onSubmit={handleSubmit}>
          <input type="text" value={formEntry} onChange={(e) => setFormEntry(e.target.value)}/>
          <input className="submit" type="submit" value="Get my Pokémon!"/>
        </form>
        {loading && <p>Loading...</p>}
        {error && (
          <div>
            {`Oops! There's a problem fetching your Pokémon data - ${error}`}
          </div>
       )}
      </header>
      <main>
      <div className="poke-card">
        <div className="left">
           <img className="poke-img" src={pokemon.sprites.front_default} alt={pokemon.name}/>
          <h2 className="poke-name">{pokemon.name}</h2>
        </div>
        <div className="right">
          <h2>Moves</h2>
          <ul>
            {/* {movesList} */}
          </ul>
        </div>
        </div>
      </main>
    </div>
  );
}

export default App;
