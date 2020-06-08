import React, { useState } from "react";

function RegisterForm({ onSubmit = () => {} }) {
    const [name, setName] = useState("");
    const [merchantName, setMerchantName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        onSubmit(name, merchantName, email, password, password2);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Alamat Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="merchantName">Nama AHS</label>
                <input
                    type="text"
                    className="form-control"
                    id="merchantName"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword2">
                    Ketik Ulang Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default RegisterForm;
