import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import GetStocks from './Stocks/GetStocks';
import { get } from '../axios';
import { addAlert } from '../redux/actions/alert';

const Stocks = ({ alert, history }) => {
    
    return (
        <div></div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message))
})

export default connect(null, mapDispatchToProps)(Stocks);
