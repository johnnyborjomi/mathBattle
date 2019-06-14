import * as React from "react";
type Props = { onSignIn: any; failMess: [string, string] };

export class LoginForm extends React.Component<Props> {
  nameInput: any;
  passInput: any;

  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.passInput = React.createRef();
  }

  render() {
    let name = this.nameInput;
    let pass = this.passInput;
    return (
      <form
        name="login-form"
        onSubmit={e =>
          this.props.onSignIn(e, name.current.value, pass.current.value)
        }
      >
        <label htmlFor="">Name</label>
        <input id="loginName" type="text" ref={this.nameInput} min="3" />
        <label htmlFor="">Password</label>
        <input id="loginPass" type="password" ref={this.passInput} min="5" />
        <label className="message-alert">
          {this.props.failMess[0] === "login"
            ? "Invalid login or password!"
            : ""}
        </label>
        <input className="button-submit" type="submit" value="Login" />
      </form>
    );
  }
}
