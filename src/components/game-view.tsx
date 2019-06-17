import * as React from "react";
import Game from "./game";
import { Task } from "./task-generator";
import { ProgressBar } from "./progress-bar";
import { ScoreList } from "./score-list";

type Props = { playerName: string };

export class GameView extends React.Component<Props> {
  game: Game;

  state: {
    lastScore: number;
    scores: [];
    timeLeft: number;
    task: Task;
    inGame: boolean;
  };

  constructor(props) {
    super(props);
    this.game = new Game(
      this.toggleScreen.bind(this),
      this.updateContent.bind(this),
      this.saveResult.bind(this)
    );
    const { timeLeft, lastScore, task } = this.game;
    this.state = { timeLeft, lastScore, task, inGame: false, scores: [] };

    document.addEventListener("keyup", e => {
      if (e.key === "ArrowRight") {
        this.game.checkTask(false);
      }
      if (e.key === "ArrowLeft") {
        this.game.checkTask(true);
      }
    });
  }

  async saveResult(score) {
    let scores = await fetch("/saveScore", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ playerName: this.props.playerName, score: score })
    }).then(data => data.json());
    this.setState({ scores });
  }

  async getScores() {
    let scores = await fetch("/getScore").then(data => data.json());
    this.setState({ scores });
  }

  //get data and set state before render
  componentWillMount() {
    this.getScores();
  }

  toggleScreen(inGame) {
    this.setState({ inGame });
  }

  updateContent(game: Game) {
    const { timeLeft, lastScore, task } = game;
    this.setState({ timeLeft, lastScore, task });
  }

  render() {
    if (this.state.inGame) {
      return (
        <div className="game-field in-game">
          <div className="player-name">Player: {this.props.playerName}</div>
          <div className="score-text">
            Score: <span className="score">{this.state.lastScore}</span>
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
          <div className="player-name">Player: {this.props.playerName}</div>
          <h1>Math Battle!</h1>
          <div className="score-text">
            Your Last Score:{" "}
            <span className="score">{this.state.lastScore}</span>
          </div>
          <ScoreList score={this.state.scores} />
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
