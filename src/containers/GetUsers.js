import React, { useState, useEffect } from 'react';
import { get } from '../axios';
import { addAlert } from '../redux/actions/alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const GetUsers = ({ alert }) => {
    const [users, setList] = useState([]);
    const [d, setD] = useState('d-none');

    useEffect(() => {
        get(
            '/users',
            (success) => {
                setD(() => '');
                setList(() => success.data);
            },
            (error) => {
                alert(`Telah terjadi kesalahan`);
            }
        );
    }, []);

    return (
        <div>
            <table className={`table table-striped ${d}`}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Merchant</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.merchant
                                    ? user.merchant.name
                                    : '(SUPER ADMIN)'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
});

export default connect(null, mapDispatchToProps)(GetUsers);
