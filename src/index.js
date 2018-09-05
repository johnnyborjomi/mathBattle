
import "./scss/style.scss";

import {taskGenerator} from './js/task-generator';




const formula = document.querySelector('.formula');
const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');
const timeline = document.querySelector('.timeline .line');
const score = document.querySelector('.score');


class Game {
    constructor(){
        this.score = 0;

        this.timeLeft = 100;

        document.addEventListener('keyup', (e)=>{
            if(e.key  === "ArrowRight"){
                this.checkTask(true)
            }
            if(e.key === "ArrowLeft"){
                this.checkTask(false);
            }
        })

        correct.onclick = () => this.checkTask(true);

        wrong.onclick = () => this.checkTask(false);

        this.timer = setInterval(()=>this.changeTime(-1), 300);

        this.nextTask();
    }

    checkTask (isCorrect) {
        if(this.task.taskState === isCorrect) {
            this.score ++;
            this.changeTime(10);
        }
        this.nextTask();

    }

    nextTask (){
        this.task = taskGenerator();
        formula.textContent = this.task.formula;
        score.textContent = this.score;
    }

    changeTime (value){
        this.timeLeft += value;
        timeline.style.width = this.timeLeft + "%";
    }


}

new Game();





