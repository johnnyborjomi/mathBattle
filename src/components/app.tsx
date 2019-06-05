import { GameView } from "./game-view";

import * as React from "react";

declare global {
  interface Window {
    a: any;
  }
}

export class App extends React.Component {
  nameInput: any;
  passInput: any;

  state: {
    isLoggedIn: boolean;
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
    this.nameInput = React.createRef();
    this.passInput = React.createRef();
  }

  signIn(e) {
    e.preventDefault();

    let nameValue;
    this.checkUser();
    console.log(e);
  }

  async checkUser() {
    let users = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.nameInput.current.value,
        pass: this.passInput.current.value
      })
    }).then(data => data.json());

    let user = users.find(user => {
      return (
        user.name === this.nameInput.current.value &&
        user.pass === this.passInput.current.value
      );
    });
    if (user) {
      console.log(user);
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="game-field">
          <h1>Math Battle!</h1>
          <h2>
            Please Sign In or <a href="#">Sign Up.</a>
          </h2>

          <form name="login-form" onSubmit={e => this.signIn(e)}>
            <label htmlFor="">Name</label>
            <input id="name" type="text" ref={this.nameInput} />
            <label htmlFor="">Password</label>
            <input id="pass" type="password" ref={this.passInput} />
            <input className="button-submit" type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return <GameView />;
    }
  }
}
