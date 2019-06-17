import * as React from "react";

export function ScoreList(props) {
  let scoreList = props.score.map(
    (scoreItem: { name: string; score: number }, i) => (
      <li key={i}>
        <span>{i + 1}. </span>
        <span>{scoreItem.name} : </span>
        <span>{scoreItem.score}</span>
      </li>
    )
  );
  return (
    <div className="score-list">
      <h2>Scores</h2>
      <ul>{scoreList}</ul>
    </div>
  );
}
