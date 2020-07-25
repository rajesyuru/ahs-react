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
import { Row, Col } from 'reactstrap';
import Alerts from '../components/Alerts';
import Navigation from './Navigation';
import { setMenuState } from '../redux/actions/menu';
import { Spinner } from 'reactstrap';

const Content = ({ user, menu, history, setMenuState }) => {
    return (
        <div className="main-container">
            <div className="notification-container">
                <Alerts />
            </div>
            {user ? (
                <Fragment>
                    <Navigation />
                    <main
                        onClick={() => setMenuState(false)}
                        className={`${menu ? 'open' : ''}`}>
                        <div className="container-fluid p-4">
                            <Row>
                                <Col className="p-0">
                                    <Switch>
                                        <Fragment>
                                            <Route
                                                path="/"
                                                exact
                                                component={Home}
                                            />
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
                                            <Route
                                                path="/stocks"
                                                component={Stocks}
                                            />
                                            <Route
                                                path="/customers"
                                                component={Customer}
                                            />
                                        </Fragment>

                                        <Route component={NotFound} />
                                    </Switch>
                                </Col>
                            </Row>
                        </div>
                    </main>
                </Fragment>
            ) : (
                <Switch>
                    <Route path="/" exact component={Login} />
                </Switch>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    menu: state.menu,
});

const mapDispatchToProps = (dispatch) => ({
    setMenuState: (menu) => dispatch(setMenuState(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
