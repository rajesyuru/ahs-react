import React from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../redux/actions/user";
import { connect } from "react-redux";

function Login({ login }) {
    const submitHandler = (email, password) => {
        login(email, password);
    };
    return (
        <div>
            <LoginForm onSubmit={submitHandler} />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(login(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
