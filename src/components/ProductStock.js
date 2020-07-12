import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const ProductStock = ({ product_name, stock }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5
                    className={`card-title ${stock > 0 && 'text-success'} ${
                        stock === 0 && 'text-secondary'
                    } ${stock < 0 && 'text-danger'} font-weight-bold`}
                >
                    {stock}
                </h5>
                <small className="card-text">{product_name}</small>
                <Link to="/" className="stretched-link" />
            </div>
        </div>
    );
};

export default connect()(ProductStock);
