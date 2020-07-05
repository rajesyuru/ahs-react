import React, { useEffect, useState } from 'react';
import ProductStock from '../../components/ProductStock';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addAlert } from '../../redux/actions/alert';
import { get } from '../../axios';

const GetStocks = ({ stock }) => {
    const [owned, setOwned] = useState([]);

    useEffect(() => {
        get(
            '/products',
            ({ data }) => {
                setOwned(data);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    }, []);

    return (
        <div className="container">
            <div className="row row-cols-md-5">
                {owned.map((own) => (
                    <ProductStock key={own.id} product_id={own.id} product_name={own.name} />
                ))}
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
});

export default connect(null, mapDispatchToProps)(GetStocks);
