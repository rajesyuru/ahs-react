import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addAlert } from '../../redux/actions/alert';
import { get } from '../../axios';
import ProductStock from '../../components/ProductStock'
import { getStocks } from '../../redux/actions/stock';

const GetStocks = ({ stock, getStocks, loading }) => {
    const [owned, setOwned] = useState([]);

    useEffect(() => {
        if (!stock) {
            getStocks()
        } else {
            setOwned(stock.data)
        }
        
        console.log(owned)
    }, [stock, owned]);

    return (
        <div className="container">
            <div className="row row-cols-md-5">
                {!loading ? <Fragment>
                    {owned.map((own) => 
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
