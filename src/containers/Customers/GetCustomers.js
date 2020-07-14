import React, { useState, useEffect, Fragment } from 'react';
import { getCustomers } from '../../redux/actions/customer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import { setLoading } from '../../redux/actions/loading';
import { del } from '../../axios';
import { addAlert } from '../../redux/actions/alert';
import { checkAdminMerchant } from '../../utilities';

const GetCustomers = ({
    customer,
    loading,
    getCustomers,
    user,
    history,
    alert,
}) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState([]);
    const [delId, setDelId] = useState(-1);
    const [queryName, setQueryName] = useState('');

    useEffect(() => {
        getCustomers(page, queryName);
    }, [page]);

    useEffect(() => {
        if (loading) {
            setTotalPage(() => {
                let a = [];
                for (let i = 1; i <= (customer ? customer.totalPage : 1); i++) {
                    a.push(i);
                }
                return a;
            });
        }
    }, [customer]);

    const activeNav = (type) => {
        if (loading) {
            return 'disabled';
        }
        if (type === 'prev') {
            if (page === 1) {
                return 'disabled';
            }
        } else {
            if (!customer || customer.totalPage < 1) {
                return 'disabled';
            } else if (page === customer.totalPage) {
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

    const deleteHandler = () => {
        setLoading(true);
        if (delId < 0) {
            setLoading(false);
            return alert('Telah terjadi kesalahan');
        }
        del(
            `/customers/${delId}`,
            (success) => {
                alert('Berhasil menghapus data', 'success');
                getCustomers(page);
                setLoading(false);
                setDelId(-1);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
                getCustomers(page);
                setLoading(false);
                setDelId(-1);
            }
        );
    };

    const searchName = (e) => {
        e.preventDefault();

        getCustomers(1, queryName);
    };

    const inputOnChange = (e) => {
        if (e.target.value.length === 0) {
            getCustomers(page, '');
        } else {
            setQueryName(e.target.value);
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between mb-2">
                <Link
                    className={`btn btn-primary p-2 ${
                        checkAdminMerchant(user) ? '' : 'disabled'
                    }`}
                    to="/customers/add"
                >
                    Add Customer
                    <span className="material-icons align-middle ml-1">
                        add
                    </span>
                </Link>
                <form
                    className="input-group w-25 h-100 mt-1"
                    onSubmit={searchName}
                >
                    <input
                        type="text"
                        className="form-control"
                        onChange={inputOnChange}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-primary"
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        {checkAdminMerchant(user) ? (
                            <th scope="col" className="text-center">
                                Actions
                            </th>
                        ) : null}
                    </tr>
                </thead>
                <tbody className={`${loading && 'd-none'}`}>
                    {customer && customer.data.length > 0 ? (
                        customer.data.map((custom) => (
                            <tr key={custom.id}>
                                <td>{custom.name}</td>
                                <td> {custom.email || '~'} </td>
                                <td> {custom.phone} </td>
                                <td> {custom.address}</td>
                                {checkAdminMerchant(user) ? (
                                    <td className="text-center">
                                        <Link
                                            to={`/customers/edit?id=${custom.id}`}
                                            className="mr-2"
                                        >
                                            <span
                                                className={`material-icons align-middle text-primary`}
                                                style={{ marginBottom: 2 }}
                                                title="Edit"
                                            >
                                                edit
                                            </span>
                                        </Link>
                                        <span
                                            className="material-icons align-middle text-danger ml-2"
                                            style={{
                                                marginBottom: 2,
                                                userSelect: 'none',
                                                cursor: 'pointer',
                                            }}
                                            data-toggle="modal"
                                            data-target="#modal"
                                            onClick={(e) => setDelId(custom.id)}
                                            title="Delete"
                                        >
                                            delete
                                        </span>
                                    </td>
                                ) : null}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                {queryName.length > 0
                                    ? 'Pelanggan tidak ditemukan'
                                    : checkAdminMerchant(user)
                                    ? 'Belum ada pelanggan, silahkan tambahkan pelanggan'
                                    : 'Belum ada pelanggan'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
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
            <DeleteModal
                deleteHandler={deleteHandler}
                additionalText="All transactions related to this customer will also be deleted."
            />
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
    getCustomers: (page, name) => dispatch(getCustomers(page, name)),
    setLoading: (loading) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetCustomers);
