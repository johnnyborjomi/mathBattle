import * as React from "react";
import { func } from "prop-types";

function ScoreList(props) {
  let score = props.score.map((scoreItem: { name: string; score: number }) => {
    <li>
      <span>{scoreItem.name}</span>
      <span>{scoreItem.score}</span>
    </li>;
  });
  return <ul>{score}</ul>;
}

export class GetScoreList extends React.Component {
  score: [];
  state: {
    score: [{ name: string; score: string }];
  };

  constructor(props) {
    super(props);
    this.state = {
      score: [{ name: "", score: "" }]
    };
  }

  async getScores() {
    let scores = await fetch("/getScore").then(data => data.json());
    this.setScores(scores);
  }

  setScores(scores) {
    this.setState({ score: scores });
  }
  //get data and set state before render
  componentWillMount() {
    this.getScores();
  }

  render() {
    return (
      <div className="score-list">
        <ScoreList score={this.state.score} />
        {/* {this.state.score.map(item => item.score)} */}
      </div>
    );
  }
}
