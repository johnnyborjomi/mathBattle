import * as React from "react";
import Game from "./game";
import { ProgressBar } from "./progress-bar";
export class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.game = new Game(this.toggleScreen.bind(this), this.updateContent.bind(this));
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
    updateContent(game) {
        const { timeLeft, score, task } = game;
        this.setState({ timeLeft, score, task });
    }
    render() {
        if (this.state.inGame) {
            return (React.createElement("div", { className: "game-field in-game" },
                React.createElement("div", { className: "score-text" },
                    "Score: ",
                    React.createElement("span", { className: "score" }, this.state.score)),
                React.createElement("div", { className: "formula" }, this.state.task.formula),
                React.createElement(ProgressBar, { value: this.state.timeLeft }),
                React.createElement("div", { className: "buttons" },
                    React.createElement("button", { className: "correct", onClick: () => this.game.checkTask(true) }, "yes"),
                    React.createElement("button", { className: "wrong", onClick: () => this.game.checkTask(false) }, "no"))));
        }
        else {
            return (React.createElement("div", { className: "game-field in-start" },
                React.createElement("div", { className: "score-text" },
                    "Score: ",
                    React.createElement("span", { className: "score" }, this.state.score)),
                React.createElement("h1", null, "Math Battle!"),
                React.createElement("div", { className: "buttons buttons--start" },
                    React.createElement("button", { className: "start", onClick: () => this.game.start() }, "start"))));
        }
    }
}
//# sourceMappingURL=game-view.js.map