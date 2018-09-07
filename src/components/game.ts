

// class Game {

//     score: number;
//     timeLeft: number;
//     gameState: boolean;
//     timer: number;
//     task: Task;

//     constructor(){
//         this.score = 0;

//         this.timeLeft = 100;

//         this.gameState = false;

//     }


//     start () {
//         if(this.gameState) return;
//         startScreen.classList.add('hidden');
//         gameScreen.classList.remove('hidden');
//         this.score = 0;
//         this.nextTask();
//         this.gameState = true;
//         this.timer = window.setInterval(()=>this.changeTime(-0.5), 100);
//     }

//     end () {
//         this.gameState = false;
//         startScreen.classList.remove('hidden');
//         gameScreen.classList.add('hidden');
//         timeline.style.width = '100%';
//         this.timeLeft = 100;
//         clearInterval(this.timer);
//         scoreFinal.textContent = this.score.toString();
//     }


//     checkTask (isCorrect) {
//         if(this.task.taskState === isCorrect) {
//             this.score ++;
//             this.changeTime(10);
//         }else {
//             this.changeTime(-20);
//         }
        
//         this.nextTask();

//     }

//     nextTask (){
//         this.task = taskGenerator();
//         formula.textContent = this.task.formula;
//         scoreCurrent.textContent = this.score.toString();
//     }

//     changeTime (value){
//         if(this.timeLeft < 100 - value) {
//             this.timeLeft += value;
//             timeline.style.width = this.timeLeft + "%";
//         }
//         if(this.timeLeft <= 0 + value) {
//             this.end();
//         }

//     }


// }