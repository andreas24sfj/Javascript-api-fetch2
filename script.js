const content = document.getElementById("content");

// first layer fetch
async function getData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=386");
  const data = await response.json();
  console.log(data.results);

  // second layer fetch
  const pokemonUrls = data.results.map((pokemon) => pokemon.url);
  const pokemonPromises = pokemonUrls.map((url) =>
    fetch(url).then((response) => response.json())
  );


  const pokeDetails = await Promise.all(pokemonPromises);

  // console.log(pokemonUrls)
  console.log(pokeDetails);
  console.log(pokeDetails.map((pokemon)=>pokemon.types.map((allTypes)=>allTypes.type.name)));
  

  content.innerHTML = (pokeDetails.map((pokemon) => {
      return (
      `
        <div class="pokemon-card"> 
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}"/>
        <img src="${pokemon.sprites.back_default}"/>
        <p class="stats"><b>type:</b>${pokemon.types.map((allTypes) => `${allTypes.type.name}`).join(` + `)}</p>
        
         <p class="stats"><b>weight:</b> ${pokemon.weight}</p>
         <p class="stats"><b>height:</b> ${pokemon.height}</p>
        </div>
        
        `);
    }))
    .join("<hr>");
}
 console.log()
 getData(); 
