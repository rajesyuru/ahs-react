import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAlert } from '../redux/actions/alert';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import id from 'date-fns/locale/id';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/id';

registerLocale('id', id);

const TransactionForm = ({
    onSubmit = () => {},
    loading,
    stateDate,
    stateSelected,
    stateProduct = [],
    stateQuantity = '',
    stateType = '',
    stateInfo,
    action,
    alert,
}) => {
    const [date, setDate] = useState(new Date());
    const [selected, setSelected] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        setDate(stateDate);
        setQuantity(stateQuantity);
        setSelected(stateSelected);
        setType(stateType);
        setInfo(stateInfo);
    }, [stateDate, stateQuantity, stateSelected, stateType, stateInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        let today = moment(date).format('YYYY-MM-DD');

        if (!today.length > 0 || !date) {
            return alert('Tanggal perlu dipilih');
        } else if (!selected.length > 0) {
            return alert('Produk perlu dipilih');
        } else if (!type.length > 0) {
            return alert('Jenis transaksi perlu dipilih');
        }

        if (!/\S/.test(info) && info.length > 0) {
            setInfo('');
        }

        onSubmit(
            today,
            selected * 1,
            type,
            quantity * 1,
            info.length > 0 ? info : null
        );
    };

    return (
        <form onSubmit={submitHandler} className="mt-2">
            <div className="form-group">
                <label htmlFor="date" className="d-block">
                    Tanggal:
                </label>
                <ReactDatePicker
                    selected={date}
                    locale="id"
                    dateFormat="dd MMMM yyyy"
                    className="form-control"
                    placeholderText="--Pilih tanggal--"
                    disabledKeyboardNavigation
                    todayButton={`Hari ini (${moment(new Date()).format(
                        'DD MMMM'
                    )})`}
                    onChange={(e) => setDate(e)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="product">Produk:</label>
                <select
                    id="product"
                    className="form-control"
                    onChange={(e) => {
                        setSelected(e.target.value);
                    }}
                    value={selected}
                >
                    <option value="" disabled>
                        --Pilih produk--
                    </option>
                    {stateProduct.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Tipe transaksi:</label>
                <div className="form-check p-0">
                    <div className="form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="buy"
                            value="buy"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setType(e.target.value);
                                }
                            }}
                        />
                        <label htmlFor="buy" className="form-check-label">
                            Beli
                        </label>
                        <input
                            className="form-check-input ml-3"
                            type="radio"
                            name="type"
                            id="sell"
                            value="sell"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setType(e.target.value);
                                }
                            }}
                        />
                        <label htmlFor="sell" className="form-check-label">
                            Jual
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Jumlah barang:</label>
                <input
                    type="number"
                    className="form-control w-25"
                    id="quantity"
                    min="0"
                    value={quantity ? quantity : 1}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="info">Info tambahan:</label>
                <textarea
                    className="form-control mb-4"
                    id="info"
                    rows="2"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    placeholder={`--Tambahkan info/catatan khusus untuk transaksi ini (contoh: 'Belum dibayar')-- `}
                />
            </div>
            <button
                type="submit"
                className={`btn btn-primary ${loading ? 'disabled' : ''}`}
                disabled={loading}
            >
                {action ? action : 'Submit'}
            </button>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
});

export default connect(null, mapDispatchToProps)(TransactionForm);
