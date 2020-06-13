import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addAlert } from '../redux/actions/alert';

const ProductForm = ({ onSubmit = () => {}, loading, stateName = "", statePrice = "", action, alert }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        setName(stateName);
        setPrice(statePrice);
    }, [stateName, statePrice])

    const submitHandler = (e) => {
        e.preventDefault();

        if (!name.length > 0) {
            alert(`Nama produk perlu diisi`)
            return;
        } else if (!price.length > 0) {
            alert('Harga perlu diisi')
            return;
        }

        onSubmit(name, price * 1);
    };

    // console.log(loading)
    

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <button type="submit" className={`btn btn-primary ${loading ? "disabled" : ""}`} disabled={loading} >
                {action ? action : "Submit"}
            </button>
        </form>
    )
};

// LoginForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// };

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message))
})

export default connect(null, mapDispatchToProps)(ProductForm);
