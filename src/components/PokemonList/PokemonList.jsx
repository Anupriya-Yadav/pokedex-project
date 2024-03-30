import { useEffect, useState} from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {

    const [pokemonList ,setPokemonList] =useState([]);
    const [isLoading,setIsLoading] = useState(true);


    async function downloadPokemons() {
        
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/') // that will downloads 20 pokemons
        const pokemonResults = response.data.results;// we get th array of pokemons from the result
        console.log(response.data);

        // itreating over the array of pokemons ,a nd using their url ,to create an array of promises
        // that will downaload these 20 pokemons
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        // passing that promises array to axios.all
        const pokemonData = await axios.all(pokemonResultsPromise);     
        console.log(pokemonData);
        // now itreate on the data of each pokemons,and extract id,name,image,types
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
                return{ 
                    id: pokemon.id,
                    name:pokemon.name,
                    image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types:pokemon.types}
             });
             console.log(res);
             setPokemonList(res);
             setIsLoading(false);
    }
    useEffect(()=>{
           downloadPokemons();
    },[]);
    
    return(
        <>
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div> 
            <div className="pokemon-wrapper">
            {(isLoading) ? 'loading....': 
            pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)}
          
            </div>
            <div className="controls">
                <button>prev</button>
                <button>next</button>
            </div>
            
        </div>
      
        </>
       
    )
}
export default PokemonList;