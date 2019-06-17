import * as React from "react";
import { func } from "prop-types";

function ScoreList(score) {
  let scoreList = score.score.map(
    (scoreItem: { name: string; score: number }, i) => (
      <li key={i}>
        <span>{i + 1}. </span>
        <span>{scoreItem.name} : </span>
        <span>{scoreItem.score}</span>
      </li>
    )
  );
  return <ul>{scoreList}</ul>;
}

export class GetScoreList extends React.Component {
  state: {
    score: [];
  };

  constructor(props) {
    super(props);
    this.state = {
      score: []
    };
  }

  async getScores() {
    let score = await fetch("/getScore").then(data => data.json());
    this.setState({ score });
  }

  //get data and set state before render
  componentWillMount() {
    this.getScores();
  }

  render() {
    return (
      <div className="score-list">
        <h2>Scores</h2>
        <ScoreList score={this.state.score} />
      </div>
    );
  }
}
