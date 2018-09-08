import {throttle} from 'lodash';

import Game from './game'

import * as React from "react";



export const a = function (){
const startScreen = document.querySelector('.in-start');
const gameScreen = document.querySelector('.in-game');
const formula = document.querySelector('.formula');
const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');
const timeline : HTMLElement = document.querySelector('.timeline .line');
const scoreCurrent : HTMLElement = gameScreen.querySelector('.score');
const scoreFinal : HTMLElement = startScreen.querySelector('.score');
const startButton = document.querySelector('.start');



function toggleScreen(arg) {
    startScreen.classList.toggle('hidden', arg);
    gameScreen.classList.toggle('hidden', !arg);
}

function updateContent({timeLeft, score, task}: Game) {

    timeline.style.width = timeLeft + "%";
    scoreFinal.textContent = score.toString();
    scoreCurrent.textContent = score.toString();
    formula.textContent = task.formula;
}


let game = new Game(toggleScreen, updateContent);

document.addEventListener('keyup', (e)=>{
    if(e.key  === "ArrowRight"){
        game.checkTask(false);
    }
    if(e.key === "ArrowLeft"){
        game.checkTask(true);
    }
});

correct.addEventListener('click', () => game.checkTask(true));

wrong.addEventListener('click', () => game.checkTask(false));

startButton.addEventListener('click', () => game.start());

console.log(2);

}

console.log(1);