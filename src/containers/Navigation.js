import React, { Fragment } from 'react';
import TopNav from './Nav/TopNav';
import SideNav from './Nav/SideNav';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = ({ history }) => {
    return (
        <Fragment>
            <TopNav />
            <SideNav />
        </Fragment>
    );
};

export default connect()(Navigation);
