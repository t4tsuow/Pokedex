const resultado = document.getElementById('resultado')
const campoBusca = document.getElementById('campoBusca')
const btnBuscar = document.getElementById('btnBuscar')
const btnProximo = document.getElementById('btnProximo')

let pokemonAtual = 1;

async function buscarPokemon(termo) {

    const url = "https://pokeapi.co/api/v2/pokemon/" + termo
    const resposta = await fetch(url)
    const pokemon = await resposta.json()

    pokemonAtual = pokemon.id;

    const spriteAnimado = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
    const imagemFinal = spriteAnimado ? spriteAnimado : pokemon.sprites.front_default;

    resultado.innerHTML = `
        <img src="${imagemFinal}"/>
        <p>#${pokemon.id}</p>
        <h2>${pokemon.name}</h2>
    `;
}

btnBuscar.addEventListener('click', () => {
    console.log("Fui Clicado buscando pokemon" + campoBusca.value)
    buscarPokemon(campoBusca.value)
});

campoBusca.addEventListener('keyup', evento => {
    if (evento.key == "Enter") {
        btnBuscar.click()
    }
});

btnProximo.addEventListener('click', () => {
    pokemonAtual++;
    buscarPokemon(pokemonAtual);
});