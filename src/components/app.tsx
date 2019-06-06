import { GameView } from "./game-view";

import * as React from "react";
import { LoginForm } from "./login-form";

declare global {
  interface Window {
    a: any;
  }
}

export class App extends React.Component {
  state: {
    isLoggedIn: boolean;
  };

  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.state = {
      isLoggedIn: Boolean(window.sessionStorage.getItem("isLogged"))
    };
  }
  async signIn(e, userName, userPass) {
    console.log(this);
    e.preventDefault();
    (await this.checkUserAuth(userName, userPass))
      ? this.authSuccess()
      : this.authFailed();
  }

  async checkUserAuth(userName, userPass) {
    return await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userName,
        pass: userPass
      })
    }).then(data => data.json());
  }

  authSuccess() {
    this.setState({ isLoggedIn: true });
    // window.sessionStorage.setItem("isLogged", "true");
  }

  authFailed() {
    console.log("auth failed");
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="game-field">
          <h1>Math Battle!</h1>
          <h2>
            Please Sign In or <a href="#">Sign Up.</a>
          </h2>
          <LoginForm onSignIn={this.signIn} />;
        </div>
      );
    } else {
      return <GameView />;
    }
  }
}
