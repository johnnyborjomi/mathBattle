import * as React from "react";
export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.passInput = React.createRef();
    }
    render() {
        let name = this.nameInput;
        let pass = this.passInput;
        return (React.createElement("form", { name: "login-form", onSubmit: e => this.props.onSignIn(e, name.current.value, pass.current.value) },
            React.createElement("label", { htmlFor: "" }, "Name"),
            React.createElement("input", { id: "loginName", type: "text", ref: this.nameInput, min: "3" }),
            React.createElement("label", { htmlFor: "" }, "Password"),
            React.createElement("input", { id: "loginPass", type: "password", ref: this.passInput, min: "5" }),
            React.createElement("label", { className: "message-alert" }, this.props.failMess[0] === "login"
                ? "Invalid login or password!"
                : ""),
            React.createElement("input", { className: "button-submit", type: "submit", value: "Login" })));
    }
}
//# sourceMappingURL=login-form.js.map