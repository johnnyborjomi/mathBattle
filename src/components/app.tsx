import { GameView } from "./game-view";

import * as React from "react";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./signup-form";
import { checkUserAuth } from "./authentification";

declare global {
  interface Window {
    a: any;
  }
}

export class App extends React.Component {
  toggleForm1: any;
  toggleForm2: any;
  toggleForms: [any, any];
  state: {
    isLoggedIn: boolean;
    authFailMess: [string, string];
    playerName: string;
  };

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
  async signIn(e, userName, userPass) {
    e.preventDefault();
    let result = await checkUserAuth("/login", userName, userPass);
    result.auth
      ? this.authSuccess(result.playerName)
      : this.authFailedMessage(["login", result.failMess]);
  }

  async signUp(e, userName, userPass) {
    console.log(this);
    e.preventDefault();
    let result = await checkUserAuth("/signup", userName, userPass);
    result.success
      ? this.authSuccess(result.playerName)
      : this.authFailedMessage(["signup", result.failMess]);
  }

  authSuccess(playerName) {
    this.setState({
      isLoggedIn: true,
      authFailMess: "",
      playerName: playerName
    });
    // window.sessionStorage.setItem("isLogged", "true");
  }

  //TODO: Pass object with error text

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
      return (
        <div className="game-field">
          <h1>Math Battle!</h1>

          <div className="login-form toggler-target" ref={this.toggleForm1}>
            <h2>
              Please Log In or{" "}
              <a href="#" onClick={e => this.toggleForm(e)}>
                {" "}
                Sign Up.{" "}
              </a>
            </h2>
            <LoginForm
              onSignIn={this.signIn}
              failMess={this.state.authFailMess}
            />
          </div>
          <div
            className="signup-form toggler-target hidden"
            ref={this.toggleForm2}
          >
            <h2>
              Please{" "}
              <a href="#" onClick={e => this.toggleForm(e)}>
                {" "}
                Log In
              </a>{" "}
              or Sign Up.{" "}
            </h2>
            <SignUpForm
              onSignIn={this.signUp}
              failMess={this.state.authFailMess}
            />
          </div>
        </div>
      );
    } else {
      return <GameView playerName={this.state.playerName} />;
    }
  }
}
