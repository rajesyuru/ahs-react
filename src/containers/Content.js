import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import NotFound from './NotFound';
import Home from './Home';
import GetUsers from './GetUsers';
import Product from './Product';
import Login from './Login';

const Content = ({ user }) => {

    return (
        <Switch>
            {user ? (
                <Fragment>
                    <Route path="/" exact component={Home} />
                    <Route path="/users" exact component={GetUsers} />
                    <Route path="/products" component={Product} />
                </Fragment>
            ) : (
                <Route path="/" exact component={Login} />
            )}
            <Route component={NotFound} />
        </Switch>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Content);
