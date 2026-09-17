const boneco = document.querySelector("#boneco");
const jogo = document.querySelector("#jogo");

let x = 100;
let y = 300;

const velocidade = 10;

document.addEventListener("keydown", function(event) {

    if (event.key === "d") {
        x += velocidade;
    }

    if (event.key === "a") {
        x -= velocidade;
    }

    if (event.key === "w") {
        y -= velocidade;
    }

    if (event.key === "s") {
        y += velocidade;
    }

    // Limite esquerdo
    if (x < 0) {
        x = 0;
    }

    // Limite direito
    if (x > jogo.clientWidth - boneco.clientWidth) {
        x = jogo.clientWidth - boneco.clientWidth;
    }

    // Limite superior
    if (y < 0) {
        y = 0;
    }

    // Limite inferior
    if (y > jogo.clientHeight - boneco.clientHeight) {
        y = jogo.clientHeight - boneco.clientHeight;
    }

    boneco.style.left = x + "px";
    boneco.style.top = y + "px";
});