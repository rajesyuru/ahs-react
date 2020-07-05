import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GetStocks from './Stocks/GetStocks';
import { get } from '../axios';

function Home({ user, history }) {
    const [owned, setOwned] = useState([]);

    useEffect(() => {
        get(
            '/products',
            ({ data }) => {
                if (!data.length > 0) {
                    history.push('/products/get');
                    return alert('Anda belum memiliki produk');
                }
                setOwned(data);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    }, []);
    return (
        <div className="container-fluid">
            {user.merchant_id === null ? (
                <h1>Welcome, Admin</h1>
            ) : (
                <GetStocks />
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);
