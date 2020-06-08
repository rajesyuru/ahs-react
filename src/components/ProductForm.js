import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";

const ProductForm = ({ onSubmit = () => {}, loading }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (!loading) {
            setName('');
            setPrice('');
        }
    }, [loading])

    const submitHandler = (e) => {
        e.preventDefault();

        onSubmit(name, price * 1);
    };
    

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
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    )
};

// LoginForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// };

export default ProductForm
