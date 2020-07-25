import React, { useState, useEffect } from 'react';
import { get } from '../axios';
import { addAlert } from '../redux/actions/alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setLoading } from '../redux/actions/loading';
import TableLoadingSpinner from '../components/TableLoadingSpinner'

const GetUsers = ({ alert, loading, setLoading }) => {
    const [users, setList] = useState([]);
    const [d, setD] = useState('d-none');

    useEffect(() => {
        setLoading(true)
        get(
            '/users',
            (success) => {
                setD(() => '');
                setList(() => success.data);
                setLoading(false)
            },
            (error) => {
                alert(`Telah terjadi kesalahan`);
                setLoading(false)
            }
        );
    }, []);

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Merchant</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading ? users.map((user) => (
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
                    )) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <TableLoadingSpinner loading={loading} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
    setLoading: (loading) => dispatch(setLoading(loading))
});

const mapStateToProps = (state) => ({
    loading: state.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(GetUsers);
