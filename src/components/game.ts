import { Task, taskGenerator } from "./task-generator";

export default class Game {
  lastScore: number;
  timeLeft: number;
  gameState: boolean;
  timer: number;
  task: Task;

  constructor(public toggleScreen, public updateContent, public saveResult) {
    this.lastScore = 0;

    this.timeLeft = 100;

    this.gameState = false;
  }

  start() {
    if (this.gameState) return;
    this.toggleScreen(true);
    this.lastScore = 0;
    this.nextTask();
    this.gameState = true;
    this.timer = window.setInterval(() => this.changeTime(-0.5), 100);
  }

  end() {
    this.gameState = false;
    this.toggleScreen(false);
    this.timeLeft = 100;
    clearInterval(this.timer);
    this.saveResult(this.lastScore);
    this.updateContent(this);
  }

  checkTask(isCorrect) {
    if (this.task.taskState === isCorrect) {
      this.lastScore++;
      this.changeTime(10);
    } else {
      this.changeTime(-20);
    }

    this.nextTask();
  }

  nextTask() {
    this.task = taskGenerator();
    this.updateContent(this);
  }

  changeTime(value) {
    if (this.timeLeft < 100 - value) {
      this.timeLeft += value;
      this.updateContent(this);
    }
    if (this.timeLeft <= 0 + value) {
      this.end();
    }
  }
}
