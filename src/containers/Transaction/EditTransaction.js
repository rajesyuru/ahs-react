import React, { useEffect, useState } from 'react';
import { get, put } from '../../axios';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import TransactionForm from '../../components/TransactionForm';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';

const EditTransaction = ({ alert, history }) => {
    const [owned, setOwned] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        const search = history.location.search;
        if (!search.length > 0) {
            history.push('/transactions/get');
            return alert('Telah terjadi kesalahan');
        }

        const query = search.substring(1);
        
        if (!query.includes('id') || !query.includes('date') || !query.includes('product_id') || !query.includes('quantity')) {
            history.push('/transactions/get');
            return alert('Telah terjadi kesalahan');
        }
        const queryId = query.split('&')[0].substring(3);
        const queryDate = query.split('&')[1].substring(5);
        const queryProduct = query.split('&')[2].substring(11);
        const queryQuantity = query.split('&')[3].substring(9);

        if (!queryId.match(/^\d+$/) || !queryDate.match(/^\d{4}[-]\d{2}[-]\d{2}$/) || !queryProduct.match(/^\d+$/) || !queryQuantity.match(/^\d+$/)) {
            history.push('/transactions/get');
            
            return alert('Telah terjadi kesalahan');
        }

        get(
            '/products',
            ({ data }) => {
                if (!data.length > 0) {
                    history.push('/products/get');
                    return alert('Anda belum memiliki produk');
                }
                setOwned(data);
                setLoading(false);
                setId(queryId);
                setDate(new Date(queryDate));
                setProductId(`${queryProduct}`);
                setQuantity(`${queryQuantity}`);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    }, []);

    const onSubmitHandler = (date, product_id, quantity) => {
        setSubmitting(true);
        put(
            `/transactions/${id}`,
            {
                date,
                product_id,
                quantity
            },
            (success) => {
                setSubmitting(false);
                alert('Transaksi berhasil diedit', 'success');
                history.push('/transactions/get');
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        )
    };
    return !loading ? (
        <TransactionForm
            stateProduct={owned}
            loading={submitting}
            action="Edit"
            stateDate={date}
            stateSelected={productId}
            stateQuantity={quantity}
            onSubmit={onSubmitHandler}
        />
    ) : (
        <div></div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
});

export default connect(null, mapDispatchToProps)(EditTransaction);
