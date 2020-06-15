import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/user';

function NavBar({ user, logout, history }) {
    const logoutHandler = (e) => {
        e.preventDefault();

        logout();
        history.push('/'); // redirect to home
    };

    const userHandler = (e) => {
        e.preventDefault();

        history.push('/users');
    };

    const productHandler = (e) => {
        e.preventDefault();

        history.push('/products/get');
    };

    const merchantHandler = (e) => {
        e.preventDefault();

        history.push('/merchants/get');
    };

    const transactionHandler = (e) => {
        e.preventDefault();

        history.push('/transactions/get');
    };

    const home = (e) => {
        e.preventDefault();

        history.push('/');
    };

    const activeLink = (nav) => {
        const current = history.location.pathname;
        if (current === nav) {
            return 'active';
        } else {
            return '';
        }
    };

    const renderNav = () => (
        <Fragment>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav ml-auto">
                    <li className={`nav-item ${activeLink('/')}`}>
                        <a className="nav-link" href="/" onClick={home}>
                            Home
                        </a>
                    </li>
                    <li className={`nav-item ${activeLink('/users')}`}>
                        <a className="nav-link" href="#" onClick={userHandler}>
                            Users
                        </a>
                    </li>
                    <li className={`nav-item ${activeLink('/products/get')}`}>
                        <a
                            className="nav-link"
                            href="#"
                            onClick={productHandler}
                        >
                            Products
                        </a>
                    </li>
                    {!user.merchant_id && (
                        <li
                            className={`nav-item ${activeLink(
                                '/merchants/get'
                            )}`}
                        >
                            <a
                                className="nav-link"
                                href="#"
                                onClick={merchantHandler}
                            >
                                Merchants
                            </a>
                        </li>
                    )}

                    {user.group_id === 1 && (
                        <li
                            className={`nav-item ${activeLink(
                                '/transactions/get'
                            )}`}
                        >
                            <a
                                className="nav-link"
                                href="#"
                                onClick={transactionHandler}
                            >
                                Transactions
                            </a>
                        </li>
                    )}

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="#"
                            onClick={logoutHandler}
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </Fragment>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">
                AHS
            </Link>
            {user && renderNav()}
        </nav>
    );
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
