import React, { useEffect, useState, Fragment } from 'react';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTransactions } from '../../redux/actions/transaction';
import moment from 'moment';
import 'moment/locale/id';
import { put } from '../../axios';

const GetTransaction = ({
    alert,
    getTransaction,
    transaction,
    history,
    user,
}) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(
        history.location.search ? history.location.search.substring(6) * 1 : 1
    );
    const [totalPage, setTotal] = useState(1);
    const [d, setD] = useState('d-none');
    const [paging, setPaging] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const [selected, setSelected] = useState([]);
    const [checked, setChecked] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
        getTransaction(page);
    }, []);

    useEffect(() => {
        setLoading(true);
        const search = history.location.search.substring(1);
        if (
            !search.includes('page') &&
            history.location.pathname === '/transactions/get'
        ) {
            if (page !== 1) {
                history.push(`/transactions/get?page=${page}`);
            }
        } else {
            setPage(search.substring(5) * 1);
        }

        if (user.merchant_id !== null && user.group_id === 1) {
            setAuth(true);
        }

        if (!transaction) {
            getTransaction(page);
        } else {
            const { data, totalPage, totalData } = transaction;

            if (transactions.length !== 0) {
                setTransactions(data);
                setInterval(() => {
                    setLoading(false);
                    setD(() => '');
                }, 1000);
                setTotal(totalPage);
                setPaging(() => {
                    let a = [];
                    for (let i = 1; i <= totalPage; i++) {
                        a.push(i);
                    }
                    return a;
                });
            } else {
                setTransactions(data);
            }
        }
    }, [page, history.location, transaction, transactions]);

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

    const activeNav = (type) => {
        if (loading) {
            return 'disabled';
        }
        if (type === 'prev') {
            if (page === 1) {
                return 'disabled';
            }
        } else {
            if (page === totalPage) {
                return 'disabled';
            }
        }
    };

    const deleteData = () => {
        setD('d-none');
        setLoading(true);
        console.log(selected);
        put(
            '/transactions',
            {
                ids: selected,
            },
            (success) => {
                alert('Data berhasil dihapus', 'success');
                getTransactions(page);
                setD('d-none');
                setLoading(true);
                setSelected([]);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
            }
        );
    };

    const cancelButton = (
        <button
            className="btn btn-secondary"
            onClick={() => {
                setDeleting(false);
                setEditing(false);
                setSelected([]);
            }}
        >
            Cancel
        </button>
    );

    return (
        <div className={`container-fluid ${deleting && 'pl-5'}`}>
            <table className={`table table-striped table-bordered mb-0 ${d}`}>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((tran) => (
                            <tr key={tran.id}>
                                <td>
                                    {moment(tran.date).format('LL')}
                                    {deleting && (
                                        <input
                                            type="checkbox"
                                            className="position-absolute mt-2"
                                            id={tran.id}
                                            value={tran.id}
                                            style={{ left: '3%' }}
                                            onChange={(e) => {
                                                e.persist();
                                                if (e.target.checked) {
                                                    setSelected((prevData) => [
                                                        ...prevData,
                                                        e.target.value * 1,
                                                    ]);
                                                } else {
                                                    setSelected((prevData) =>
                                                        prevData.filter(
                                                            (i) =>
                                                                i !==
                                                                e.target.value *
                                                                    1
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    )}
                                </td>
                                <td>{tran.product.name}</td>
                                <td>Rp. {numberWithCommas(tran.price)}</td>
                                <td className="d-flex justify-content-between">
                                    {tran.quantity}
                                    {auth && editing && (
                                        <Link
                                            to={`/transactions/edit?id=${
                                                tran.id
                                            }&date=${moment(tran.date).format(
                                                'YYYY-MM-DD'
                                            )}&product_id=${
                                                tran.product.id
                                            }&quantity=${tran.quantity}`}
                                        >
                                            <span
                                                className={`material-icons align-middle`}
                                                style={{ marginBottom: 2 }}
                                            >
                                                edit
                                            </span>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">
                                Belum ada transaksi, silahkan tambahkan
                                transaksi
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {auth && (
                <Fragment>
                    <div className="d-flex justify-content-between">
                        {deleting || (
                            <Link className="m-0" to="/transactions/add">
                                <span
                                    className="material-icons"
                                    style={{ fontSize: 30 }}
                                >
                                    add_box
                                </span>
                            </Link>
                        )}

                        {deleting || editing || (
                            <div>
                                <button
                                    className="btn btn-info px-2"
                                    onClick={() => {
                                        setEditing(true);
                                        setDeleting(false);
                                    }}
                                >
                                    <span
                                        className="material-icons text-light"
                                        style={{ fontSize: 20, marginTop: 2 }}
                                    >
                                        edit
                                    </span>
                                </button>
                                <button
                                    className="btn btn-danger px-2"
                                    onClick={() => {
                                        setEditing(false);
                                        setDeleting(true);
                                    }}
                                >
                                    <span
                                        className="material-icons text-light"
                                        style={{ fontSize: 20, marginTop: 2 }}
                                    >
                                        delete
                                    </span>
                                </button>
                            </div>
                        )}
                        {editing && (
                            <div className="mt-1">
                                {cancelButton}
                            </div>
                        )}
                    </div>
                    {deleting && (
                        <Fragment>
                            <p className="my-3">
                                Selected: <strong>{selected.length}</strong>
                            </p>
                            <button
                                className={`btn btn-danger ${
                                    !selected.length > 0 && 'disabled'
                                } mr-2`}
                                disabled={!selected.length > 0}
                                data-toggle="modal"
                                data-target="#modal"
                            >
                                Delete
                            </button>
                            {cancelButton}
                        </Fragment>
                    )}
                </Fragment>
            )}

            <div
                className="modal fade"
                tabIndex="-1"
                id="modal"
                role="dialog"
                data-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title text-danger">
                                Warning!
                            </h3>
                        </div>
                        <div className="modal-body py-3">
                            <p className="font-weight-bold">
                                Are you really sure want to delete{' '}
                                {selected.length > 1
                                    ? 'these items'
                                    : 'this item'}
                                ?
                            </p>
                            <small>(Note: You cannot undo this action)</small>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={deleteData}
                            >
                                Delete Permanently
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
    getTransaction: (page) => dispatch(getTransactions(page)),
});

const mapStateToProps = (state) => ({
    transaction: state.transaction,
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(GetTransaction);
