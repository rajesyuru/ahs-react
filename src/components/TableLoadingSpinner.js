import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const TableLoadingSpinner = ({ loading }) => {
    return (
        <Spinner
            className={`table-loading-spinner ${!loading ? 'd-none' : ''}`}
        />
    );
};

TableLoadingSpinner.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default TableLoadingSpinner;
