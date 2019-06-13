import * as React from "react";
type Props = { onSignIn: any; failMess: string };
export class SignUpForm extends React.Component<Props> {
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
        <input id="name" type="text" ref={this.nameInput} min="3" />
        <label htmlFor="">Password</label>
        <input id="pass" type="password" ref={this.passInput} min="5" />
        <label className="message-alert">
          {this.props.failMess === "signup"
            ? "User with this name already exist!"
            : ""}
        </label>
        <input className="button-submit" type="submit" value="Sign Up" />
      </form>
    );
  }
}
