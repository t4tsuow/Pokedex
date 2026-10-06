const resultado = document.getElementById('resultado')
const campoBusca = document.getElementById('campoBusca')
const btnBuscar = document.getElementById('btnBuscar')
const btnProximo = document.getElementById('btnProximo')
const btnAnterior = document.getElementById('btnAnterior')
const btnAleatorio = document.getElementById('btnAleatorio')

let pokemonAtual = 1

// Imagens de fundo por tipo (troque pelos seus caminhos ou URLs)
const fundosPorTipo = {
    normal: "img/fundos/normal.png",
    fire: "img/fundos/fire.png",
    water: "img/fundos/water.png",
    grass: "img/fundos/grass.png",
    electric: "img/fundos/electric.png",
    ice: "img/fundos/ice.png",
    fighting: "img/fundos/fighting.png",
    poison: "img/fundos/poison.png",
    ground: "img/fundos/ground.png",
    flying: "img/fundos/flying.png",
    psychic: "img/fundos/psychic.png",
    bug: "img/fundos/bug.png",
    rock: "img/fundos/rock.png",
    ghost: "img/fundos/ghost.png",
    dragon: "img/fundos/dragon.png",
    dark: "img/fundos/dark.png",
    steel: "img/fundos/steel.png",
    fairy: "img/fundos/fairy.png"
}

// Cor de segurança caso a imagem não carregue
const coresPorTipo = {
    normal: "#a8a77a", fire: "#ee8130", water: "#6390f0",
    grass: "#7ac74c", electric: "#f7d02c", ice: "#96d9d6",
    fighting: "#c22e28", poison: "#a33ea1", ground: "#e2bf65",
    flying: "#a98ff3", psychic: "#f95587", bug: "#a6b91a",
    rock: "#b6a136", ghost: "#735797", dragon: "#6f35fc",
    dark: "#705746", steel: "#b7b7ce", fairy: "#d685ad"
}

// Nome em português + emoji de cada tipo
const tiposPt = {
    normal:   "⚪ Normal",
    fire:     "🔥 Fogo",
    water:    "💧 Água",
    grass:    "🌿 Planta",
    electric: "⚡ Elétrico",
    ice:      "❄️ Gelo",
    fighting: "🥊 Lutador",
    poison:   "☠️ Veneno",
    ground:   "⛰️ Terra",
    flying:   "🕊️ Voador",
    psychic:  "🧠 Psíquico",
    bug:      "🐛 Inseto",
    rock:     "🪨 Pedra",
    ghost:    "👻 Fantasma",
    dragon:   "🐉 Dragão",
    dark:     "🌑 Sombrio",
    steel:    "⚙️ Aço",
    fairy:    "🧚 Fada"
}

// Só estes status aparecem, na ordem em que estão aqui
const statsExibidos = [
    { chave: "attack",          rotulo: "⚔️ Ataque" },
    { chave: "hp",              rotulo: "❤️ Vida" },
    { chave: "special-attack",  rotulo: "✨ Atq. Esp." },
    { chave: "special-defense", rotulo: "🔮 Def. Esp." },
    { chave: "speed",           rotulo: "💨 Velocidade" }
]

async function buscarPokemon(termo) {

    let numero = Number(termo)

    if (numero > 1025) termo = pokemonAtual = 1
    if (numero < 1) termo = pokemonAtual = 1025

    const url = "https://pokeapi.co/api/v2/pokemon/" + String(termo).toLowerCase().trim()

    const resposta = await fetch(url)

    if (resposta.ok) {

        const pokemon = await resposta.json()

        pokemonAtual = pokemon.id

        // Imagem do pokémon
        const spriteAnimado =
            pokemon.sprites.versions['generation-v']['black-white'].animated.front_default

        const imagemFinal = spriteAnimado
            ? spriteAnimado
            : pokemon.sprites.front_default

        // Fundo pelo tipo principal
        const tipoPrincipal = pokemon.types[0].type.name
        const imagemFundo = fundosPorTipo[tipoPrincipal]
        const corFundo = coresPorTipo[tipoPrincipal] || "#777"

        // Tipo(s): um Pokémon pode ter 1 ou 2
        const tiposHTML = pokemon.types.map(t => {
            const nome = tiposPt[t.type.name] || t.type.name
            return `<span class="chip">${nome}</span>`
        }).join("")

        // Tamanho: a API manda a altura em decímetros
        const altura = (pokemon.height / 10).toLocaleString("pt-BR") + " m"

        // Status escolhidos
        const statsHTML = statsExibidos.map(item => {
            const stat = pokemon.stats.find(s => s.stat.name === item.chave)
            const valor = stat.base_stat
            const largura = Math.min((valor / 255) * 100, 100)
            const cor = valor >= 100 ? "#4caf50" : valor >= 60 ? "#ffc107" : "#f44336"

            return `
                <div class="stat">
                    <span class="stat-nome">${item.rotulo}</span>
                    <span class="stat-valor">${valor}</span>
                    <div class="stat-barra">
                        <div class="stat-preenchimento" style="width: ${largura}%; background: ${cor}"></div>
                    </div>
                </div>
            `
        }).join("")

        resultado.innerHTML = `
            <div class="area-pokemon"
                 style="background-color: ${corFundo}; background-image: url('${imagemFundo}')">

                <div class="plataforma plataforma-jogador"></div>

                <div class="pokemon-conteudo">
                    <img src="${imagemFinal}" alt="Pokémon ${pokemon.name}"/>
                    <p>#${pokemon.id}</p>
                    <h2>${pokemon.name}</h2>
                </div>
            </div>

            <div class="divisoria"></div>

            <div class="info">
                <div class="info-item">
                    <span class="info-rotulo">🏷️ Tipo</span>
                    <span class="info-valor">${tiposHTML}</span>
                </div>
                <div class="info-item">
                    <span class="info-rotulo">📏 Tamanho</span>
                    <span class="info-valor">${altura}</span>
                </div>
            </div>

            <div class="stats">
                ${statsHTML}
            </div>
        `

    } else {

        resultado.innerHTML = `
            <h2 class="erro">Pokemon nao encontrado!</h2>
        `
    }
}

btnBuscar.addEventListener('click', () => {
    buscarPokemon(campoBusca.value)
})

campoBusca.addEventListener('keyup', evento => {
    if (evento.key == "Enter") {
        btnBuscar.click()
    }
})

btnProximo.addEventListener('click', () => {
    pokemonAtual++
    buscarPokemon(pokemonAtual)
})

btnAnterior.addEventListener('click', () => {
    pokemonAtual--
    buscarPokemon(pokemonAtual)
})

btnAleatorio.addEventListener('click', () => {
    pokemonAtual = Math.floor(Math.random() * 1025) + 1
    buscarPokemon(pokemonAtual)
})

buscarPokemon(1)