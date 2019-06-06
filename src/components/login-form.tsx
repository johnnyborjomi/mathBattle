import * as React from "react";
type Props = { onSignIn: any };
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
        <input id="name" type="text" ref={this.nameInput} />
        <label htmlFor="">Password</label>
        <input id="pass" type="password" ref={this.passInput} />
        <input className="button-submit" type="submit" value="Submit" />
      </form>
    );
  }
}
