import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import '../styles/Pokemon.css';

const Pokemon = () => {
  const [pokemonSelect, setPokemonSelect] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [pokeName, setPokeName] = useState('');
  const [firstRun, setFirstRun] = useState(true);
  const [showPokemonInfo, setShowPokemonInfo] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const showPokemon = () => {
    setShowPokemonInfo(true);
  };

  //Fetch inicial para poblar el select con los primeros 20 pokemones de la API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const { results } = await res.json();

      setPokemonSelect(results);
    };

    fetchData();
  }, []);

  //Use effect que se activa cuando el valor seleccionado del pokemon cambia, lo cual actualiza la url
  useEffect(() => {
    const updateParams = () => {
      if (pokeName === '') return;

      navigate(`/pokemon/${pokeName}`);
    };

    updateParams();
  }, [pokeName]);

  //Se activa cuando se actualizan los parametros de la url, se trae la informacion especifica del pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      if (firstRun) {
        setFirstRun(false);
      } else {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`
        );
        const data = await res.json();

        const pokeData = {
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default,
          types: data.types,
          weight: data.weight,
          height: data.height,
        };

        setCurrentPokemon(pokeData);
        setShowPokemonInfo(null);
      }
    };

    fetchPokemon();
  }, [params]);

  return (
    <div className='pokemon-container'>
      <h1 className='pokemon-title'>Selecciona un Pokemon</h1>
      <select
        className='pokemon-select'
        onChange={(ev) => setPokeName(ev.target.value)}
      >
        <option value=''>Pokemon</option>
        {pokemonSelect &&
          pokemonSelect.map((pokeOption) => (
            <option value={pokeOption.name} key={pokeOption.name}>
              {pokeOption.name.charAt(0).toUpperCase() +
                pokeOption.name.slice(1)}
            </option>
          ))}
      </select>
      <button className='pokemon-button' onClick={showPokemon}>
        Ver Detalle
      </button>
      {showPokemonInfo && (
        <div className='poke-container'>
          <div className='sprite-container'>
            <img
              src={currentPokemon.sprite}
              alt={`Foto de ${currentPokemon.name}`}
              className='poke-sprite'
            />
          </div>
          <div className='info-container'>
            <h2>
              {currentPokemon.name.charAt(0).toUpperCase() +
                currentPokemon.name.slice(1)}
            </h2>
            <ul>
              <li>Weight: {currentPokemon.weight}</li>
              <li>Height: {currentPokemon.height}</li>
              {currentPokemon.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
