import {throttle} from 'lodash/throttle';

import "./scss/style.scss";

import {taskGenerator} from './js/task-generator';



const gameField = document.querySelector('.game-field');
const formula = document.querySelector('.formula');
const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');
const timeline = document.querySelector('.timeline .line');
const score = document.querySelector('.score');


class Game {
    constructor(){
        this.score = 0;

        this.timeLeft = 100;

        this.gameState = false;

        document.addEventListener('keyup', (e)=>{
            if(e.key  === "ArrowRight"){
                this.checkTask(true);
            }
            if(e.key === "ArrowLeft"){
                this.checkTask(false);
            }
        });

        correct.onclick = () => {
            gameField.classList.remove('in-start');
            gameField.classList.remove('in-result');
            gameField.classList.add('in-game');
            this.nextTask();
            if(this.gameState){
                this.checkTask(true)
            }else{
                this.gameState = true;
                this.timer = setInterval(()=>this.changeTime(-0.5), 100);
            }
        };

        wrong.onclick = () => this.checkTask(false);




    }

    checkGameState() {

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
        score.textContent = this.score;
    }

    changeTime (value){
        if(this.timeLeft < 100 - value) {
            this.timeLeft += value;
            timeline.style.width = this.timeLeft + "%";
        }
        if(this.timeLeft <= 0 + value) {
            this.gameState = false;
            gameField.classList.add('in-result');
            gameField.classList.remove('in-game');
            timeline.style.width = '100%';
            this.timeLeft = 100;
            clearInterval(this.timer);
            this.score = 0;

        }

    }


}

new Game();





