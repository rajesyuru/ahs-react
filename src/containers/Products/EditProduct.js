import React, {useState, useEffect} from 'react';
import ProductForm from '../../components/ProductForm';
import { postWithAuth } from '../../axios';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addAlert } from '../../redux/actions/alert';

const EditProduct = ({user, history, alert}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.merchant_id === null || user.group_id !== 1) {
            history.push('/products/get')
            alert('Login sebagai admin merchant untuk menambahkan produk')
        };
        const search = history.location.search;
        if (!search.includes('id')) {
            history.push('/products/get')
            alert('Product not found')
        }
    }, []);

    const submitHandler = (name, price) => {
        setLoading(true)
        postWithAuth(
            '/products',
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
                alert(`Telah terjadi kesalahan: ${error}`);
            }
        );
    };
    return (
        <div>
            <ProductForm onSubmit={submitHandler} />
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
