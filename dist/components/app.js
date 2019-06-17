var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GameView } from "./game-view";
import * as React from "react";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./signup-form";
import { checkUserAuth } from "./authentification";
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.toggleForms = [
            (this.toggleForm1 = React.createRef()),
            (this.toggleForm2 = React.createRef())
        ];
        this.state = {
            isLoggedIn: Boolean(window.sessionStorage.getItem("isLogged")),
            playerName: "",
            authFailMess: ["", ""]
        };
    }
    signIn(e, userName, userPass) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let result = yield checkUserAuth("/login", userName, userPass);
            result.auth
                ? this.authSuccess(result.playerName)
                : this.authFailedMessage(["login", result.failMess]);
        });
    }
    signUp(e, userName, userPass) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this);
            e.preventDefault();
            let result = yield checkUserAuth("/signup", userName, userPass);
            result.success
                ? this.authSuccess(result.playerName)
                : this.authFailedMessage(["signup", result.failMess]);
        });
    }
    authSuccess(playerName) {
        this.setState({
            isLoggedIn: true,
            authFailMess: "",
            playerName: playerName
        });
        // window.sessionStorage.setItem("isLogged", "true");
    }
    authFailedMessage(mess) {
        console.log(`auth failed`);
        this.setState({ authFailMess: mess });
    }
    toggleForm(e) {
        e.preventDefault();
        this.toggleForms.forEach(form => {
            let formClass = form.current.classList;
            formClass.contains("hidden")
                ? formClass.remove("hidden")
                : formClass.add("hidden");
        });
    }
    render() {
        if (!this.state.isLoggedIn) {
            return (React.createElement("div", { className: "game-field" },
                React.createElement("h1", null, "Math Battle!"),
                React.createElement("div", { className: "login-form toggler-target", ref: this.toggleForm1 },
                    React.createElement("h2", null,
                        "Please Log In or",
                        " ",
                        React.createElement("a", { href: "#", onClick: e => this.toggleForm(e) },
                            " ",
                            "Sign Up.",
                            " ")),
                    React.createElement(LoginForm, { onSignIn: this.signIn, failMess: this.state.authFailMess })),
                React.createElement("div", { className: "signup-form toggler-target hidden", ref: this.toggleForm2 },
                    React.createElement("h2", null,
                        "Please",
                        " ",
                        React.createElement("a", { href: "#", onClick: e => this.toggleForm(e) },
                            " ",
                            "Log In"),
                        " ",
                        "or Sign Up.",
                        " "),
                    React.createElement(SignUpForm, { onSignIn: this.signUp, failMess: this.state.authFailMess }))));
        }
        else {
            return React.createElement(GameView, { playerName: this.state.playerName });
        }
    }
}
//# sourceMappingURL=app.js.map