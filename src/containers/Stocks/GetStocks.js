import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addAlert } from '../../redux/actions/alert';
import { get } from '../../axios';
import ProductStock from '../../components/ProductStock'
import { getStocks } from '../../redux/actions/stock';
import PageLoadingSpinner from '../../components/PageLoadingSpinner'

const GetStocks = ({ stock, getStocks, loading }) => {
    const [owned, setOwned] = useState([]);

    useEffect(() => {
        getStocks()
    }, []);

    return (
        <div className="container">
            <PageLoadingSpinner loading={loading} />
            <div className="row row-cols-md-5">
                {!loading ? <Fragment>
                    {stock && stock.data.map((own) => 
                        <ProductStock key={own.product_id} product_name={own.name} stock={own.stock} />
                    )}
                </Fragment> : null }
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
    getStocks: () => dispatch(getStocks())
});

const mapStateToProps = (state) => ({
    stock: state.stock,
    loading: state.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(GetStocks);
