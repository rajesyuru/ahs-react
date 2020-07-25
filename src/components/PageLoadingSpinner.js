import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const PageLoadingSpinner = ({ loading }) => {
    return (
        <Spinner
            className={`page-loading-spinner ${!loading ? 'd-none' : ''}`}
        />
    );
};

PageLoadingSpinner.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default PageLoadingSpinner;
