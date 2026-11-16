const palavras = [
    { palavra: "javascript", categoria: "Tecnologia", dica: "Linguagem usada para criar interatividade em sites." },
    { palavra: "computador", categoria: "Tecnologia", dica: "Equipamento usado para executar programas." },
    { palavra: "internet", categoria: "Tecnologia", dica: "Rede mundial que conecta dispositivos." },
    { palavra: "navegador", categoria: "Tecnologia", dica: "Programa usado para acessar sites." },
    { palavra: "girassol", categoria: "Natureza", dica: "Flor que acompanha a direção do sol." },
    { palavra: "borboleta", categoria: "Animais", dica: "Inseto que passa pela metamorfose." },
    { palavra: "elefante", categoria: "Animais", dica: "Animal conhecido pela tromba." },
    { palavra: "tartaruga", categoria: "Animais", dica: "Animal que possui casco." },
    { palavra: "abacaxi", categoria: "Alimentos", dica: "Fruta tropical com casca espinhosa." },
    { palavra: "chocolate", categoria: "Alimentos", dica: "Doce feito a partir do cacau." },
    { palavra: "biblioteca", categoria: "Lugares", dica: "Local onde encontramos livros para leitura." },
    { palavra: "brasil", categoria: "Geografia", dica: "País localizado na América do Sul." }
];

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoFinalizado = false;

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const elementoCategoria = document.getElementById("categoria");
const elementoDica = document.getElementById("dica");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    const escolha = palavras[indice];

    palavraSecreta = escolha.palavra;
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoFinalizado = false;

    elementoCategoria.textContent = escolha.categoria;
    elementoDica.textContent = escolha.dica;
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "Nenhuma";
    mensagem.textContent = "Boa sorte! Digite uma letra.";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;

    atualizarPalavra();
    inputLetra.focus();
}

function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao.trim();
}

function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

function verificarLetra() {
    if (jogoFinalizado) {
        return;
    }

    const letra = inputLetra.value.trim().toLowerCase();

    if (!/^[a-z]$/.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra de A a Z.";
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Essa letra já foi utilizada.";
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou! Tente outra letra.";
    }

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");
    inputLetra.value = "";

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        finalizarJogo();
    } else if (tentativas === 0) {
        mensagem.textContent = "Você perdeu! A palavra era " + palavraSecreta + ".";
        finalizarJogo();
    } else {
        inputLetra.focus();
    }
}

function finalizarJogo() {
    jogoFinalizado = true;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
}

botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

// Desafio extra: permite tentar uma letra pressionando Enter.
inputLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

iniciarJogo();
