import { GameView } from "./game-view";
import * as React from "react";
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.nameInput = document.querySelector("#name");
        this.passInput = document.querySelector("");
    }
    signIn(e) {
        console.log("lol");
        e.preventDefault();
        this.setState({ isLoggedIn: true });
    }
    checkUser() { }
    render() {
        if (!this.state.isLoggedIn) {
            return (React.createElement("div", { className: "game-field" },
                React.createElement("h1", null, "Math Battle!"),
                React.createElement("h2", null, "Please Sign In."),
                React.createElement("form", { action: "" },
                    React.createElement("label", { htmlFor: "" }, "Name"),
                    React.createElement("input", { id: "name", type: "text" }),
                    React.createElement("label", { htmlFor: "" }, "Password"),
                    React.createElement("input", { id: "pass", type: "password" }),
                    React.createElement("input", { type: "submit", value: "Submit", onClick: e => this.signIn(e) }))));
        }
        else {
            return React.createElement(GameView, null);
        }
    }
}
//# sourceMappingURL=app.js.map