import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GetStocks from './Stocks/GetStocks';
function Home({ user, history }) {
    return (
        <Fragment>
            {user.merchant_id === null ? (
                <h1>Welcome, Admin</h1>
            ) : (
                <GetStocks />
            )}
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);
