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
    const [info, setInfo] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const search = history.location.search;
        if (!search.length > 0) {
            history.push('/transactions/get');
            return alert('Telah terjadi kesalahan');
        }

        const query = search.substring(1);
        
        if (!query.includes('id')) {
            history.push('/transactions/get');
            return alert('Telah terjadi kesalahan');
        }
        const queryId = query.split('&')[0].substring(3);

        if (!queryId.match(/^\d+$/)) {
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
                setId(queryId)
                get(
                    `/transactions?id=${queryId}`,
                    ({data}) => {
                        const item = data[0];
                        setDate(new Date(item.date));
                        setProductId(item.product_id);
                        setQuantity(item.quantity * 1);
                        setType(item.type);
                        if (item.info) {
                            setInfo(item.info)
                        }
                        setLoading(false);
                    },
                    (error) => {
                        alert('Telah terjadi kesalahan');
                        setLoading(false);
                    }
                )
            },
            (error) => {
                alert('Telah terjadi kesalahan');
                setLoading(false);
            }
        );
    }, []);

    const onSubmitHandler = (date, product_id, type, quantity, info) => {
        setSubmitting(true);
        put(
            `/transactions/${id}`,
            {
                date,
                product_id,
                type,
                quantity: quantity > 0 ? quantity : 0,
                info
            },
            (success) => {
                setSubmitting(false);
                alert('Transaksi berhasil diedit', 'success');
                history.push('/transactions/get');
            },
            (error) => {
                setSubmitting(false);
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
            stateInfo={info}
            stateType={type}
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
