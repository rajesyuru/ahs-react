import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/ProductForm';
import { postWithAuth, put } from '../../axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAlert } from '../../redux/actions/alert';

const EditProduct = ({ user, history, alert }) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (user.merchant_id === null || user.group_id !== 1) {
            alert('Login sebagai admin merchant untuk menambahkan produk');
            history.push('/products/get');
        };
        const prodNotFound = () => {
            alert('Product not found');
            history.push('/products/get');
        }
        const search = history.location.search;
        if (!search.includes('id') || !search.includes('name') || !search.includes('price')) {
            prodNotFound();
        }
        const queryId = search.split('&')[0];
        const queryName = search.split('&')[1];
        const queryPrice = search.split('&')[2];
        let queryIdToString;
        let queryNameToString;
        let queryPriceToString;
        if (!queryId || !queryName || !queryPrice ) {
            prodNotFound();
        } else {
            queryIdToString = queryId.replace('?id=', '');
            queryNameToString = queryName.substring(5).split('%20').join(' ');
            queryPriceToString = queryPrice.replace('price=', '');
            if (!/^\d+$/.test(queryIdToString) || !/^\d+$/.test(queryPriceToString)) {
                prodNotFound();
            } else {
                setId(queryIdToString);
                setName(queryNameToString);
                setPrice(queryPriceToString);
            }
        };
        

        // console.log(/^\d+$/.test());
    }, []);

    const submitHandler = (name, price) => {
        setLoading(true)
        put(
            `/products/${id}`,
            {
                name,
                price
            },
            (success) => {
                alert('Produk berhasil diedit', 'success');
                setLoading(false);
                history.push('/products/get');
            },
            (error) => {
                setLoading(false);
                alert(`Telah terjadi kesalahan: ${error}`);
            }
        )
    };
    return (
        <div>
            <ProductForm
                onSubmit={submitHandler}
                loading={loading}
                stateName={name}
                statePrice={price}
                action="Edit"
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
