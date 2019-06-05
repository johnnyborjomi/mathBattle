import * as React from "react";
type Props = { value: number };
export class ProgressBar extends React.Component<Props> {
  render() {
    return (
      <div className="timeline">
        <div className="line" style={{ width: `${this.props.value}%` }} />
      </div>
    );
  }
}
