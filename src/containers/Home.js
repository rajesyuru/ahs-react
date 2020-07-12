import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GetStocks from './Stocks/GetStocks';
import { get } from '../axios';

function Home({ user, history }) {
    return (
        <div className="container-fluid">
            {user.merchant_id === null ? (
                <h1>Welcome, Admin</h1>
            ) : (
                <GetStocks />
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);
