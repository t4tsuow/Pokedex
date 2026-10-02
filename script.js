const resultado = document.getElementById('resultado')
const campoBusca = document.getElementById('campoBusca')
const btnBuscar = document.getElementById('btnBuscar')
const btnProximo = document.getElementById('btnProximo')
const btnAnterior = document.getElementById('btnAnterior')
const btnAleatorio = document.getElementById('btnAleatorio')

let pokemonAtual = 1;

async function buscarPokemon(termo) {

    let numero = Number(termo);

    if (numero > 1025) termo = pokemonAtual = 1;
    if (numero < 1) termo = pokemonAtual = 1025;

    const url = "https://pokeapi.co/api/v2/pokemon/" + termo
    const resposta = await fetch(url)
    if (resposta.ok) {
        const pokemon = await resposta.json()

        pokemonAtual = pokemon.id;

        const spriteAnimado = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
        const imagemFinal = spriteAnimado ? spriteAnimado : pokemon.sprites.front_default;

        resultado.innerHTML = `
            <img src="${imagemFinal}"/>
            <p>#${pokemon.id}</p>
            <h2>${pokemon.name}</h2>
        `;
    } else {
        // escreve que n achou o pokemon
    }
}


btnBuscar.addEventListener('click', () => {
    console.log("Fui Clicado buscando pokemon" + campoBusca.value)
    buscarPokemon(campoBusca.value)
})

campoBusca.addEventListener('keyup', evento => {
    if (evento.key == "Enter") {
        btnBuscar.click()
    }
})

btnProximo.addEventListener('click', () => {
    pokemonAtual++;
    buscarPokemon(pokemonAtual);
})

btnAnterior.addEventListener('click', () => {
    pokemonAtual--;
    buscarPokemon(pokemonAtual);
})

btnAleatorio.addEventListener('click', () => {
    console.log('pokemon aleatorio')
    pokemonAtual = Math.floor(Math.random() * 1025) + 1
    buscarPokemon(pokemonAtual)
})

} else {
    resultado.innerHTML = '<h2> Pokemon nao encontrado!</h2>'
}