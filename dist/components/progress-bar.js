import * as React from "react";
export class ProgressBar extends React.Component {
    render() {
        return (React.createElement("div", { className: "timeline" },
            React.createElement("div", { className: "line", style: { width: `${this.props.value}%` } })));
    }
}
//# sourceMappingURL=progress-bar.js.map