var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from "react";
function ScoreList(props) {
    let score = props.score.map((scoreItem) => {
        React.createElement("li", null,
            React.createElement("span", null, scoreItem.name),
            React.createElement("span", null, scoreItem.score));
    });
    return React.createElement("ul", null, score);
}
export class GetScoreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: [{ name: "", score: "" }]
        };
    }
    getScores() {
        return __awaiter(this, void 0, void 0, function* () {
            let scores = yield fetch("/getScore").then(data => data.json());
            this.setScores(scores);
        });
    }
    setScores(scores) {
        this.setState({ score: scores });
    }
    //get data and set state before render
    componentWillMount() {
        this.getScores();
    }
    render() {
        return (React.createElement("div", { className: "score-list" },
            React.createElement(ScoreList, { score: this.state.score })));
    }
}
//# sourceMappingURL=score-list.js.map