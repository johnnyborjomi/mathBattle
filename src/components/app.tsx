import { GameView } from "./game-view";

import * as React from "react";

declare global {
  interface Window {
    a: any;
  }
}

export class App extends React.Component {
  state: {
    isLoggedIn: boolean;
  };
  nameInput: HTMLInputElement;
  passInput: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.nameInput = document.querySelector("#name");
    this.passInput = document.querySelector("#pass");
  }

  signIn(e) {
    this.checkUser().then(result => {
      console.log(result);
      if (result !== undefined) {
        this.setState({ isLoggedIn: true });
      }
    });
    e.preventDefault();
  }

  async checkUser() {
    await function() {
      let users = fetch("/users");

      return users
        .then(data => data.json())
        .then(data => {
          console.log(this.nameInput.value);
          return data.find(user => {
            return (
              user.name === this.nameInput.value &&
              user.pass === this.passInput.value
            );
          });
        });
    };
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="game-field">
          <h1>Math Battle!</h1>
          <h2>Please Sign In.</h2>
          <form action="">
            <label htmlFor="">Name</label>
            <input id="name" type="text" />
            <label htmlFor="">Password</label>
            <input id="pass" type="password" />
            <input type="submit" value="Submit" onClick={e => this.signIn(e)} />
          </form>
        </div>
      );
    } else {
      return <GameView />;
    }
  }
}
