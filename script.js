let openTitle = document.querySelector(".openTitle")
let openTitleLogo = document.querySelector(".openTitle>div")
let openTitleBtn = document.querySelector(".openTitle>h1")
let openTitleImg = document.querySelector(".openTitle>img")
let instrucciones = document.querySelectorAll(".instructions")
let instruccionesBtn = document.querySelectorAll(".btnHelp")


let nivel = 0



openTitleBtn.addEventListener("pointerdown", function () {
    openTitleLogo.classList.add("slideOutUp")


    setTimeout(function () {
        openTitleLogo.style.opacity = "0"

    }, 300)

    setTimeout(function () {

        openTitleImg.style.display = "block"
        openTitleLogo.style.display = "none"
    }, 700)

    setTimeout(function () {
        openTitleImg.style.opacity = "1"
        openTitleImg.classList.add("slideInUp")
        if (nivel == 0) nivel = 1
    }, 800)


    if (nivel == 1) {
        openTitle.classList.add("slideOutUp")

        setTimeout(function () {
            openTitle.style.opacity = "0"

        }, 300)
    }


    if (nivel == 2) {
        openTitle.classList.add("slideOutUp")
        juegoNivel2[0].style.display = "flex"
        board.classList.add("blur")

        setTimeout(function () {
            openTitle.style.opacity = "0"

        }, 300)
    }
})




let story = `Una chica ha planeado un viaje con su novio, han quedado de encontrarse en la finca de su familia al sur de la ciudad.. Entusiasmada emprende el viaje, al llegar se da cuenta de que su novio se ha retrasado y que deberá esperar.. Por lo que decide aprovechar el tiempo y prepararle una sorpresa.. Al entrar la casa empieza a recordar momentos en su infancia, se queda mirando fijamente a ventana.... pero se sorprende al encontrar un hombre realmente apuesto observándola de lejos.. El hombre se acerca y le tiende la mano, ella amablemente lo saluda y le explica su situación.. El hombre no deja de mirarla con intensidad y se acerca a sus labios,. ella no puede alejarse y pasan la noche juntos.. Al día siguiente se levanta en la cama de un hospital como única sobreviviente de un accidente de carretera.. Su pronóstico es reservado, acaba de escuchar que el doctor le dice a su colega.... "no me quiero imaginar lo que hubiese pasado si ella no hubiese llevado cinturón".`


let phrase = story.split(". ")
let phraseBackup = story.split(". ")
let game = document.querySelector(".game")
let board = document.querySelector(".board")
let pool = document.querySelector(".pool")
let btnPool = document.querySelector(".btnPool")
let btnArrow = document.querySelector(".btnPool>img")
let poolWords = document.querySelector(".poolWords")
let gameOver = document.querySelector(".gameOver")
let gameOverImg = document.querySelector(".gameOver>div>img")
let gameOverH1 = document.querySelector(".gameOver>div>h1")
let gameOverBtn = document.querySelector(".btnGameOver")
let juegoNivel2 = document.querySelectorAll(".juegoNivel2")
let inicioDiv = document.querySelectorAll(".inicioDiv")
let desenlaceDiv = document.querySelectorAll(".desenlaceDiv")
let inicioWords = document.querySelectorAll(".inicioWords")
let desenlaceWords = document.querySelectorAll(".desenlaceWords")
let total = 0
let palabraActual = 0
let cardsCreated = false;
let poolClosed = false
let poolOpened = true
let wordCards
let mistakes = 0
let boardCards
let tarjetonInicio




for (let index = 0; index < instruccionesBtn.length; index++) {

    instruccionesBtn[index].addEventListener("pointerdown", function () {
        instrucciones[nivel - 1].classList.add("slideOutUp")
        poolWords.classList.remove("fadeIn")

        setTimeout(function () {
            instrucciones[nivel - 1].style.opacity = "0";
        }, 200)

        setTimeout(function () {
            instrucciones[nivel - 1].style.display = "none";
            board.classList.remove("blur")
            poolWords.classList.add("fadeIn")

            if (cardsCreated == false) {
                createCards();
            }

        }, 700)
    })
}





//create text cards

function createCards() {


    shuffle(phrase)
    for (let i = 0; i < phrase.length; i++) {
        let p = document.createElement('p')
        p.textContent = phrase[i];
        p.classList.add("wordCard")
        p.classList.add("poolCard")
        if (nivel == 2) {
            p.classList.add("tarjetonInicio")
        }
        poolWords.appendChild(p);
    }


    //open and closes the word pool
    btnPool.addEventListener("pointerdown", poolMovement)



    //grabs the phrase cards
    wordCards = document.querySelectorAll(".wordCard")
    for (let i = 0; i < wordCards.length; i++) {

        wordCards[i].addEventListener("pointerdown", function () {

            if (game.classList.contains("blur") == false) {
                if (wordCards[i].classList.contains("poolCard")) {


                    wordCards[i].classList.remove("poolCard")
                    wordCards[i].classList.add("boardCard")
                    if (nivel == 1) board.appendChild(wordCards[i])
                    if (nivel == 2) {

                        for (let i = 3; i >= 0; i--) {

                            if (inicioWords[i].classList.contains(i + "") == false) {
                                palabraActual = i

                            }
                        }

                        inicioWords[palabraActual].classList.add(palabraActual + "")
                        inicioWords[palabraActual].appendChild(wordCards[i])
                    }

                    if (nivel == 3) {

                        for (let i = 3; i >= 0; i--) {

                            if (desenlaceWords[i].classList.contains(i + "") == false) {
                                palabraActual = i

                            }
                        }

                        desenlaceWords[palabraActual].classList.add(palabraActual + "")
                        desenlaceWords[palabraActual].appendChild(wordCards[i])

                    }

                    boardCards = document.querySelectorAll(".boardCard")
                    mistakeCount()

                } else if (wordCards[i].classList.contains("boardCard")) {


                    wordCards[i].classList.remove("boardCard")
                    wordCards[i].classList.add("poolCard")
                    poolWords.appendChild(wordCards[i])
                    mistakes = 0

                }
            }
        })
    }

    //erase the cards of level 2
    if (nivel == 2) {
        for (let index = 0; index < inicioWords.length; index++) {

            inicioWords[index].addEventListener("pointerdown", function () {

                inicioWords[index].classList.remove(index + "")

            })
        }
    }

    //erase the cards of level 3
    if (nivel == 3) {
        for (let index = 0; index < desenlaceWords.length; index++) {

            desenlaceWords[index].addEventListener("pointerdown", function () {

                desenlaceWords[index].classList.remove(index + "")

            })
        }
    }

    cardsCreated = true
    tarjetonInicio = document.querySelectorAll(".tarjetonInicio")
}

//closes the modal of gameOver






//movement of the pool

function poolMovement() {

    if (poolOpened) {
        btnArrow.src = "./data/btnUp.png"
        board.style.height = "550px"
        pool.style.height = "150px"
        setTimeout(function () {
            poolOpened = false;
            poolClosed = true;
        }, 500)
    }

    if (poolClosed) {
        btnArrow.src = "./data/btnDown.png"
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

//finish

function mistakeCount() {

    if (boardCards.length >= phraseBackup.length) {

        for (let i = 0; i < phraseBackup.length; i++) {

            if (phraseBackup[i] != boardCards[i].textContent) {
                mistakes += 1
            }
        }

        if (mistakes == 0) {

            gameOverH1.style.display = "none"
            gameOverImg.src = "./data/win.png"

        } else {
            gameOverH1.textContent = mistakes + " ERRORES"
            gameOverImg.src = "./data/lose.png"
        }

        game.classList.add("blur")
        gameOver.style.display = "flex"

        setTimeout(function () {
            gameOver.style.opacity = "1"

        }, 1)

        if (nivel == 1) {
            total += (80 / phraseBackup.length) * (phraseBackup.length - mistakes)

        }

        if (nivel == 2 || nivel == 3) {
            total += (phraseBackup.length - mistakes) * 15

        }

    }

}

gameOverBtn.addEventListener("pointerdown", function () {

    cardsCreated = false;
    mistakes = 0
    game.classList.remove("blur")
    gameOver.style.opacity = "0"

    setTimeout(function () {
        gameOver.style.display = "none"
    }, 500)


    //borra todas las tarjetas
    if (nivel == 1) {
        for (let i = 0; i < wordCards.length; i++) {
            board.removeChild(wordCards[i])
        }

        nivel = 2
        story = `Un hombre, colmado de tristeza y desolación por la muerte de su esposa, decide explorar un bosque al que ella tanto anhelaba ir.. Cuando empezó a anochecer, su sentido de orientación ya no funcionaba bien.. Caminaba sin rumbo por aquel bosque cuando encontró una cabaña entre varios árboles,. al golpear la puerta, no recibió respuesta y como estaba abierta decidió entrar.`
        phraseBackup = story.split(". ")
        story = `Un hombre, colmado de tristeza y desolación por la muerte de su esposa, decide explorar un bosque al que ella tanto anhelaba ir.. Cuando empezó a anochecer, su sentido de orientación ya no funcionaba bien.. Caminaba sin rumbo por aquel bosque cuando encontró una cabaña entre varios árboles,. al golpear la puerta, no recibió respuesta y como estaba abierta decidió entrar.. Un hombre que deseaba pasar unas merecidas vacaciones, decidió ir a visitar la torre Eiffel.. De la nada, su esposa se empieza a marear y deciden detenerse a descansar.. De la nada, su esposa se empieza a marear y deciden detenerse a descansar.. Apasionado por la zoología en particular por la observación de pájaros, decide adentrarse en ese bosque.. Asombrado por la opulencia de la entrada, el hombre decide entrar en aquel ascensor.`
        phrase = story.split(". ")
        openTitle.style.opacity = "1"
        openTitleImg.src = "./data/level2.png"
        openTitle.classList.remove("slideOutUp")


        setTimeout(function () {
            openTitle.classList.add("slideInDown")
        }, 1)

        setTimeout(function () {

            instrucciones[nivel - 1].style.display = "flex"
        }, 1000)

    } else if (nivel == 2) {

        board.style.display = "none"
        pool.style.display = "none"
        board.style.opacity = "0"
        pool.style.opacity = "0"

        setTimeout(function () {
            board.style.display = "flex"
            pool.style.display = "flex"

        }, 1)

        setTimeout(function () {
            board.style.opacity = "1"
            pool.style.opacity = "1"

        }, 400)

        var child = juegoNivel2[0].firstElementChild;
        while (child) {
            child.remove()
            child = juegoNivel2[0].firstElementChild;
        }


        var child = poolWords.firstElementChild;
        while (child) {
            child.remove()
            child = poolWords.firstElementChild;
        }

        palabraActual = 0
        nivel = 3
        juegoNivel2[0].style.display = "none"
        juegoNivel2[1].style.display = "flex"
        story = `Al cabo de un rato comenzó a tener sueños extraños,. en los que los personajes de los cuadros gritaban de dolor por ayuda y golpeaban los vidrios que los protegían.. A la mañana siguiente, despertó aterrorizado, al darse cuenta de que. no había pinturas en la cabaña, solo ventanas...`
        phraseBackup = story.split(". ")
        story = `Al cabo de un rato comenzó a tener sueños extraños,. en los que los personajes de los cuadros gritaban de dolor por ayuda y golpeaban los vidrios que los protegían.. A la mañana siguiente, despertó aterrorizado, al darse cuenta de que. no había pinturas en la cabaña, solo ventanas.... Se encontraba sentada en el comedor, cenando con su esposa.. En ese momento lo entendió, ahora él era parte de la colección de porcelanas que había en aquel faro.. todo lo que había en aquel restaurante estaba pintado.. abandonado por la sociedad, rodeado de otros vagabundos que consumían drogas para olvidar sus problemas.. El cuerpo de ella yace acostado, parece dormida y ahí lo comprende todo, había muerto.`
        phrase = story.split(". ")
        if (cardsCreated == false) {
            createCards();
        }
        setTimeout(function () {
            juegoNivel2[1].style.opacity = "1"
        }, 1)
    } else if (nivel == 3) {

        let end = document.querySelector(".end")
        let endImg = document.querySelector(".end>img")

        end.style.display = "flex"

        if (total >= 200) {
            total = 200
            endImg.src = "./data/perfect.png"

        } else {
            endImg.src = "./data/finished.png"
        }

        setTimeout(function () {
            end.style.opacity = "1"
        }, 1)

        christian()
    }

})



//esta función ocurre una vez haya acabado la interacción, haz el cambio dentro del setTimeout

function christian() {
    total = parseInt(total);


    setTimeout(function () {

        //aqui dentro haz el script para empalmarlo con lo demas


        console.log(total)




    }, 3000)
}