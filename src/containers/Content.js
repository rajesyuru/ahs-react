import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import Home from './Home';
import GetUsers from './GetUsers';
import Product from './Product';
import Login from './Login';
import Merchant from './Merchant';
import Transaction from './Transaction';
import Stocks from './Stocks';
import Customer from './Customer';
import NavBar from './NavBar';
import Alerts from "../components/Alerts";

const Content = ({ user }) => {
    return (
        <Fragment>
            <NavBar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12"></div>
                </div>
                <div className="row">
                    <div className="col-12 pt-2">
                        <Alerts />
                        <Switch>
                            {user ? (
                                <Fragment>
                                    <Route path="/" exact component={Home} />
                                    <Route
                                        path="/users"
                                        exact
                                        component={GetUsers}
                                    />
                                    <Route
                                        path="/products"
                                        component={Product}
                                    />
                                    <Route
                                        path="/merchants"
                                        component={Merchant}
                                    />
                                    <Route
                                        path="/transactions"
                                        component={Transaction}
                                    />
                                    <Route path="/stocks" component={Stocks} />
                                    <Route
                                        path="/customers"
                                        component={Customer}
                                    />
                                </Fragment>
                            ) : (
                                <Route path="/" exact component={Login} />
                            )}
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    merchant: state.merchant,
});

export default connect(mapStateToProps)(Content);
