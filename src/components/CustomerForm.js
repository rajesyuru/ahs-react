import React, { useState, useEffect } from 'react';
import { addAlert } from '../redux/actions/alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

const CustomerForm = ({
    stateName = '',
    stateEmail = '',
    statePhone = '',
    stateAddress = '',
    onSubmit = () => {},
    alert,
    submitting,
    loading,
    history
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        setName(stateName);
        setEmail(stateEmail);
        setPhone(statePhone);
        setAddress(stateAddress);
    }, [stateName, statePhone, stateEmail, stateAddress]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!name.length > 0) {
            return alert('Nama perlu diisi');
        }
        if (!phone.length > 0) {
            return alert('Nomor telepon perlu diisi');
        } else if (isNaN(phone)) {
            return alert('Nomor telepon perlu diisi dengan nomor');
        }
        if (!address.length > 0) {
            return alert('Alamat perlu diisi');
        }

        onSubmit(name, email.length > 0 ? email : null, phone, address);
    };

    return (
        <form onSubmit={submitHandler} className={loading ? 'd-none' : ''}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <textarea
                    className="form-control mb-4"
                    id="address"
                    rows="2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="d-flex">
                <button
                    type="submit"
                    className={`btn btn-primary mr-2 ${submitting && 'disabled'}`}
                    disabled={submitting}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className={`btn btn-secondary ${submitting && 'disabled'}`}
                    disabled={submitting}
                    onClick={() => history.goBack()}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
});

const mapStateToProps = (state) => ({
    loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
