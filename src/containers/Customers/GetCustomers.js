import React, { useState, useEffect, Fragment } from 'react';
import { getCustomers } from '../../redux/actions/customer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import ModifyingButtons from '../../components/ModifyingButtons';
import DeleteCustomerModal from '../../components/Customer/DeleteCustomerModal';
import { setLoading } from '../../redux/actions/loading';
import { del } from '../../axios'
import { addAlert } from '../../redux/actions/alert';
import CancelButton from '../../components/CancelButton';

const GetCustomers = ({ customer, loading, getCustomers, user, history, alert }) => {
    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState([]);
    const [delId, setDelId] = useState(-1);

    useEffect(() => {
        getCustomers(page);
    }, [page]);

    useEffect(() => {
        if (loading) {
            setTotalPage(() => {
                let a = [];
                for (let i = 1; i <= (customer && customer.totalPage); i++) {
                    a.push(i);
                }
                return a;
            });
        }
    }, [customer]);

    const cancelHandler = () => {
        setDeleting(false);
        setEditing(false);
    };

    const activeNav = (type) => {
        if (loading) {
            return 'disabled';
        }
        if (type === 'prev') {
            if (page === 1) {
                return 'disabled';
            }
        } else {
            if (page === (customer && customer.totalPage)) {
                return 'disabled';
            }
        }
    };

    const activePage = (p) => {
        if (loading) {
            return 'disabled';
        }
        if (p === page) {
            return 'active';
        } else {
            return '';
        }
    };

    const editingButton = () => {
        setEditing(true);
        setDeleting(false);
    };

    const deletingButton = () => {
        setEditing(false);
        setDeleting(true);
    };

    const deleteHandler = () => {
        setLoading(true);
        if (delId < 0) {
            setLoading(false)
            return alert('Telah terjadi kesalahan');
        }
        del(
            `/customers/${delId}`,
            (success) => {
                alert('Berhasil menghapus data', 'success');
                setDeleting(false);
                setEditing(false);
                setDelId(-1);
                getCustomers(page)
                setLoading(false);
            },
            (error) => {
                setLoading(false)
                alert('Telah terjadi kesalahan');
            }
        )
    };

    return (
        <div className={`container-fluid`}>
            <table className={`table table-hover table-bordered mb-0`}>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody className={`${loading && 'd-none'}`}>
                    {customer && customer.data.length > 0 ? (
                        customer.data.map((custom) => (
                            <tr key={custom.id}>
                                <td>{custom.name}</td>
                                <td> {custom.email || '~'} </td>
                                <td> {custom.phone} </td>
                                <td className="d-flex justify-content-between">
                                    {custom.address}
                                    {editing ? (
                                        <Link
                                            to={`/customers/edit?id=${custom.id}`}
                                        >
                                            <span
                                                className={`material-icons align-middle text-primary`}
                                                style={{ marginBottom: 2 }}
                                            >
                                                edit
                                            </span>
                                        </Link>
                                    ) : deleting ? (
                                        <span
                                            className={`material-icons align-middle text-danger`}
                                            style={{ marginBottom: 2, userSelect: 'none', cursor: 'pointer' }}
                                            data-toggle="modal"
                                            data-target="#modal"
                                            onClick={(e) => setDelId(custom.id)}
                                        >
                                            delete
                                        </span>
                                    ) : null}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                {user.group_id === 1 &&
                                user.merchant_id !== null
                                    ? 'Belum ada pelanggan, silahkan tambahkan pelanggan'
                                    : 'Belum ada pelanggan'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {user.group_id === 1 && user.merchant_id !== null ? (
                <Fragment>
                    <div className="d-flex justify-content-between">
                        <Link className="m-0" to="/customers/add">
                            <span
                                className="material-icons"
                                style={{ fontSize: 30 }}
                            >
                                add_box
                            </span>
                        </Link>

                        {!deleting && !editing ? (
                            <ModifyingButtons
                                editingButton={editingButton}
                                deletingButton={deletingButton}
                            />
                        ) : (
                            <div className="mt-1">
                                <CancelButton onClick={cancelHandler} />
                            </div>
                        )}
                    </div>
                </Fragment>
            ) : null}
            <div className="d-flex justify-content-around">
                <ul className="pagination">
                    <li className={`page-item ${activeNav('prev')}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                    </li>
                    {totalPage.map((number) => (
                        <li
                            className={`page-item ${activePage(number)}`}
                            key={number}
                            onClick={() => setPage(number)}
                        >
                            <button className="page-link">{number}</button>
                        </li>
                    ))}
                    <li className={`page-item ${activeNav('next')}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </div>
            <DeleteCustomerModal deleteHandler={deleteHandler} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    customer: state.customer,
    loading: state.loading,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
    getCustomers: (page) => dispatch(getCustomers(page)),
    setLoading: (loading) => dispatch(setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetCustomers);
