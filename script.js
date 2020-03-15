let story = `Un hombre decidió pasar el día explorando unos bosque que nunca había visitado. 
Cuando empezó a anochecer, su sentido de orientación ya no funcionaba bien y cada vez se empezó
a adentrar más y más en el bosque. Tras horas andando sin rumbo y de noche, encontró una cabaña 
entre varios árboles. Al golpear la puerta, no recibió respuesta y como estaba abierta decidió entrar. Al 
ver la cama, pensó que lo mejor sería ir a dormir y si alguien venía explicar lo que había pasado. 
Una vez estirado, se dio cuenta de que había muchas pinturas extrañas: eran rostros deformados con ojos 
rojos que le miraban. Intentó ignorarlos, cerró los ojos y se durmió. A la mañana siguiente, 
despertó aterrorizado al darse cuenta de que no había pinturas en la cabaña, solo ventanas..`


let phrase = story.split(". ")
let phraseBackup = phrase

let board = document.querySelector(".board")
let pool = document.querySelector(".pool")
let btnPool = document.querySelector(".btnPool")
let poolWords = document.querySelector(".poolWords")
let poolClosed = false
let poolOpened = true

let wordCards




//create phrase cards
shuffle(phrase)
for (let i = 0; i < phrase.length; i++) {
    let p = document.createElement('p')
    phrase[i] += "."
    phraseBackup += "."
    p.textContent = phrase[i];
    p.classList.add("wordCard")
    poolWords.appendChild(p);
}


//open and closes the word pool
btnPool.addEventListener("click", poolMovement)


//grabs the phrase cards
wordCards = document.querySelectorAll(".wordCard")
for (let i = 0; i < wordCards.length; i++) {
    wordCards[i].addEventListener("pointerdown", function () {
        poolMovement()

        board.style.height = "550px"
        pool.style.height = "150px"
        setTimeout(function () {
            poolOpened = false;
            poolClosed = true;
        }, 500)

    })
}




//movement of the pool

function poolMovement() {

    if (poolOpened) {
        board.style.height = "550px"
        pool.style.height = "150px"
        setTimeout(function () {
            poolOpened = false;
            poolClosed = true;
        }, 500)
    }

    if (poolClosed) {

        board.style.height = "25%"
        pool.style.height = "75%"
        setTimeout(function () {
            poolOpened = true;
            poolClosed = false;
        }, 500)

    }
}



// sort randomlky the phrases array

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}