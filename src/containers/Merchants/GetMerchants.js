import React, { useState, useEffect } from 'react';
import { get } from '../../axios';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addAlert } from '../../redux/actions/alert';

const GetMerchants = ({ alert }) => {
    const [merchants, setMerchants] = useState([]);
    const [d, setD] = useState('d-none');

    useEffect(() => {
        get(
            '/merchants',
            ({ data, totalData, totalPage }) => {
                setD('');
                setMerchants(data);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    }, []);
    return (
        <div>
            <table className={`table table-hover table-bordered mb-0`}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col" className="w-100">
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody className={`${d}`}>
                    {merchants.map((merchant) => (
                        <tr key={merchant.id}>
                            <td>{merchant.id}</td>
                            <td>{merchant.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="m-0" to="/merchants/add">
                <span className="material-icons" style={{ fontSize: 30 }}>
                    add_box
                </span>
            </Link>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
});

export default connect(null, mapDispatchToProps)(GetMerchants);
