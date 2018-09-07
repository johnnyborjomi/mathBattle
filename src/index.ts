import {throttle} from 'lodash';

import "./scss/style.scss";
import {Task} from './ts/task-generator';
import {taskGenerator} from './ts/task-generator';


const startScreen = document.querySelector('.in-start');
const gameScreen = document.querySelector('.in-game');
const formula = document.querySelector('.formula');
const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');
const timeline : HTMLElement = document.querySelector('.timeline .line');
const scoreCurrent : HTMLElement = gameScreen.querySelector('.score');
const scoreFinal : HTMLElement = startScreen.querySelector('.score');
const startButton = document.querySelector('.start');


class Game {

    score: number;
    timeLeft: number;
    gameState: boolean;
    timer: number;
    task: Task;

    constructor(){
        this.score = 0;

        this.timeLeft = 100;

        this.gameState = false;

    }


    start () {
        if(this.gameState) return;
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        this.score = 0;
        this.nextTask();
        this.gameState = true;
        this.timer = setInterval(()=>this.changeTime(-0.5), 100);
    }

    end () {
        this.gameState = false;
        startScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
        timeline.style.width = '100%';
        this.timeLeft = 100;
        clearInterval(this.timer);
        scoreFinal.textContent = this.score.toString();
    }


    checkTask (isCorrect) {
        if(this.task.taskState === isCorrect) {
            this.score ++;
            this.changeTime(10);
        }else {
            this.changeTime(-20);
        }
        
        this.nextTask();

    }

    nextTask (){
        this.task = taskGenerator();
        formula.textContent = this.task.formula;
        scoreCurrent.textContent = this.score.toString();
    }

    changeTime (value){
        if(this.timeLeft < 100 - value) {
            this.timeLeft += value;
            timeline.style.width = this.timeLeft + "%";
        }
        if(this.timeLeft <= 0 + value) {
            this.end();
        }

    }


}

let game = new Game();

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


