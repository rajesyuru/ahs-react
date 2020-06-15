import React, { useEffect, useState } from 'react';
import { get, postWithAuth } from '../../axios';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import TransactionForm from '../../components/TransactionForm';
import { connect } from 'react-redux';

const AddTransaction = ({ alert, history }) => {
    const [owned, setOwned] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        get(
            '/products',
            ({ data }) => {
                if (!data.length > 0) {
                    history.push('/products/get');
                    return alert('Anda belum memiliki produk');
                }
                setOwned(data);
                setLoading(false);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    }, []);

    const onSubmitHandler = (date, product_id, quantity) => {
        setSubmitting(true);
        postWithAuth(
            '/transactions',
            {
                date,
                product_id,
                quantity,
            },
            (success) => {
                setSubmitting(false);
                alert('Transaksi berhasil ditambahkan', 'success');
                history.push('/transactions/get');
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    };
    return !loading ? (
        <TransactionForm
            stateProduct={owned}
            loading={submitting}
            onSubmit={onSubmitHandler}
        />
    ) : (
        <div></div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
});

export default connect(null, mapDispatchToProps)(AddTransaction);
