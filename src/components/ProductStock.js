import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { get } from '../axios';
import { addAlert } from '../redux/actions/alert';

const ProductStock = ({ alert, product_name, product_id }) => {
    const [ammount, setAmmount] = useState(0);

    useEffect(() => {
        get(
            `/transactions/stocks?product_id=${product_id}`,
            ({ stocks }) => {
                setAmmount(stocks)
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    }, []);
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5
                    className={`card-title ${ammount > 0 && 'text-success'} ${
                        ammount === 0 && 'text-secondary'
                    } ${ammount < 0 && 'text-danger'} font-weight-bold`}
                >
                    {ammount}
                </h5>
                <small className="card-text">{product_name}</small>
                <Link to="/" className="stretched-link" />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
});

export default connect(null, mapDispatchToProps)(ProductStock);
