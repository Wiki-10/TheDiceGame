'use strict';

//Variables
let dicespng = ['dice-1.png', 'dice-2.png','dice-3.png','dice-4.png','dice-5.png','dice-6.png']
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
let scores = document.querySelectorAll('.score');
let score1 = document.getElementById('score--0')
let score2 = document.getElementById('score--1')
let currentscore1 = document.getElementById('current--0')
let currentscore2 = document.getElementById('current--1')
let dice = document.querySelector('.dice')
let overlay = document.querySelector('.overlay')
let modal = document.querySelector('.modal')
let dicebtn = document.querySelector('.btn--roll')
let holdbtn = document.querySelector('.btn--hold')
let newbtn = document.querySelector('.btn--new')
let rulesbtn = document.querySelector('.btn--rules')
let closebtn = document.querySelector('.close-modal')
let currentscore = 0;
let activeplayer = 0;
let scoresaved = [0, 0]
let playing = true;

//functions
const roll = function (){
    if (playing === true) {
        let random = Math.trunc(Math.random() * 6 + 1)
        dice.src = dicespng[random - 1];
        dice.classList.remove('no-display')

        if (random === 1) {
            document.getElementById(`current--${activeplayer}`).textContent = 0
            currentscore = 0
            activeplayer = activeplayer === 0 ? 1 : 0
            player1.classList.toggle('player--active')
            player2.classList.toggle('player--active')

        } else {
            currentscore = currentscore + random
            document.getElementById(`current--${activeplayer}`).textContent = currentscore


        }

    }
}

const hold = function (){
    if (playing === true) {
        scoresaved[activeplayer] = scoresaved[activeplayer] + currentscore
        if (document.getElementById(`current--${activeplayer}`).textContent != 0) {
            document.getElementById(`score--${activeplayer}`).textContent = scoresaved[activeplayer]
            document.getElementById(`current--${activeplayer}`).textContent = 0
            currentscore = 0
            if (scoresaved[activeplayer] >= 100) {
                playing = false;
                console.log('win')
                console.log(`player--${activeplayer}`)

                document.querySelector(`.player--${activeplayer}`).classList.add('player--winner')
                document.querySelector(`.player--${activeplayer}`).classList.remove('player--active')
                dice.classList.add('no-display')

            } else {
                activeplayer = activeplayer === 0 ? 1 : 0
                player1.classList.toggle('player--active')
                player2.classList.toggle('player--active')
            }


        }

    }

}

const newgame = function (){
    document.querySelector(`.player--${activeplayer}`).classList.remove('player--winner')
    for(let i=0; i<scores.length; i++){
        scores[i].textContent = '0';
    }
    player1.classList.add('player--active')
    player2.classList.remove('player--active')
    currentscore1.textContent = 0
    currentscore2.textContent = 0
    currentscore = 0
    activeplayer = 0
    scoresaved = [0, 0]
    dice.classList.add('no-display')
    playing = true


}

const openModal = function () {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

const escClose = function (e) {
    if (e.key === 'Escape') {
        closeModal()
    }
}

for(let i=0; i<scores.length; i++){
    scores[i].textContent = '0';
}

dice.classList.add('no-display')


dicebtn.addEventListener('click', roll)
holdbtn.addEventListener('click', hold)
newbtn.addEventListener('click', newgame)
rulesbtn.addEventListener('click', openModal)
closebtn.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)
document.addEventListener('keydown', escClose)


