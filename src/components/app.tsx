import { throttle } from "lodash";

import Game from "./game";

import * as React from "react";

import { Task } from "./task-generator";
import { ProgressBar } from "./progress-bar";

export class App extends React.Component {
  game: Game;

  state: {
    score: number;
    timeLeft: number;
    task: Task;
    inGame: boolean;
  };

  constructor(props) {
    super(props);

    this.game = new Game(
      this.toggleScreen.bind(this),
      this.updateContent.bind(this)
    );
    const { timeLeft, score, task } = this.game;
    this.state = { timeLeft, score, task, inGame: false };

    document.addEventListener("keyup", e => {
      if (e.key === "ArrowRight") {
        this.game.checkTask(false);
      }
      if (e.key === "ArrowLeft") {
        this.game.checkTask(true);
      }
    });
  }

  toggleScreen(inGame) {
    this.setState({ inGame });
  }

  updateContent(game: Game) {
    const { timeLeft, score, task } = game;
    this.setState({ timeLeft, score, task });
  }

  render() {
    if (this.state.inGame) {
      return (
        <div className="game-field in-game">
          <div className="score-text">
            Score: <span className="score">{this.state.score}</span>
          </div>
          <div className="formula">{this.state.task.formula}</div>

          <ProgressBar value={this.state.timeLeft} />

          <div className="buttons">
            <button
              className="correct"
              onClick={() => this.game.checkTask(true)}
            >
              yes
            </button>
            <button
              className="wrong"
              onClick={() => this.game.checkTask(false)}
            >
              no
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="game-field in-start">
          <div className="score-text">
            Score: <span className="score">{this.state.score}</span>
          </div>
          <h1>Math Battle!</h1>
          <div className="buttons buttons--start">
            <button className="start" onClick={() => this.game.start()}>
              start
            </button>
          </div>
        </div>
      );
    }
  }
}
