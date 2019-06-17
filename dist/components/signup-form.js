import * as React from "react";
export class SignUpForm extends React.Component {
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
            React.createElement("input", { id: "name", type: "text", ref: this.nameInput, min: "3" }),
            React.createElement("label", { htmlFor: "" }, "Password"),
            React.createElement("input", { id: "pass", type: "password", ref: this.passInput, min: "5" }),
            React.createElement("label", { className: "message-alert" }, this.props.failMess[0] === "signup" ? this.props.failMess[1] : ""),
            React.createElement("input", { className: "button-submit", type: "submit", value: "Sign Up" })));
    }
}
//# sourceMappingURL=signup-form.js.map