import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";
function PokemonDetails() {
    const{id} = useParams();
    const [pokemon,setPokemon]=useState({});
    async function downloadPokemons(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name)
        })
    } 
   useEffect(()=>{
    downloadPokemons()
   },[]);
    return(
        <div className="pokemon-deatils-wrapper">
            <div className="pokemon-deatils-name">name:{pokemon.name}</div>
            <img className="pokemon-deatils-image" src={pokemon.image}></img>
            <div>height:{pokemon.height}</div>
            <div>weight:{pokemon.weight}</div>
            <div className="pokemon-deatils-types">
                {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>

        </div>

    );
    
}
export default PokemonDetails;
