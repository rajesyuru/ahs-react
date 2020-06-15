import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAlert } from '../redux/actions/alert';
import ReactDatePicker, {registerLocale} from 'react-datepicker';
import id from "date-fns/locale/id";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/id';

registerLocale("id", id);

const TransactionForm = ({
    onSubmit = () => {},
    loading,
    stateDate,
    stateSelected,
    stateProduct = [],
    stateQuantity = '',
    action,
    alert,
}) => {
    const [date, setDate] = useState(new Date());
    const [selected, setSelected] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        setDate(stateDate);
        setQuantity(stateQuantity);
        setSelected(stateSelected);
    }, [stateDate, stateQuantity, stateSelected]);

    const submitHandler = (e) => {
        e.preventDefault();

        let today = moment(date).format('YYYY-MM-DD');

        if (!today.length > 0 || !date) {
            return alert('Tanggal perlu dipilih');
        } else if (!selected.length > 0) {
            return alert('Produk perlu dipilih');
        }

        onSubmit(today, selected * 1, quantity * 1);
    };

    return (
        <form onSubmit={submitHandler} className="mt-2">
            <div className="form-group">
                <label htmlFor="date" className="d-block">
                    Tanggal
                </label>
                <ReactDatePicker
                    selected={date}
                    locale="id"
                    dateFormat="dd MMMM yyyy"
                    className="form-control"
                    placeholderText="--Pilih tanggal--"
                    disabledKeyboardNavigation
                    todayButton={`Hari ini (${moment(new Date()).format('DD MMMM')})`}
                    onChange={(e) => setDate(e)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="product">Produk</label>
                <select
                    id="product"
                    className="custom-select"
                    onChange={(e) => {
                        setSelected(e.target.value);
                    }}
                    value={stateSelected || ""}
                >
                    <option value="" disabled>--Pilih produk--</option>
                    {stateProduct.map(product => 
                        <option key={product.id} value={product.id}>{product.name}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Jumlah barang</label>
                <input
                    type="number"
                    className="form-control w-25"
                    id="quantity"
                    min="0"
                    value={quantity ? quantity : 1}
                    onChange={(e) => setQuantity(e.target.value)}
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
