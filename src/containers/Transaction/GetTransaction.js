import React, { useEffect, useState, Fragment } from 'react';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTransactions } from '../../redux/actions/transaction';
import moment from 'moment';
import 'moment/locale/id';
import { put } from '../../axios';
import InfoTooltip from '../../components/InfoTooltip';
import DeleteModal from '../../components/Transaction/DeleteModal';
import ModifyingButtons from '../../components/ModifyingButtons';
import { formatPrice } from '../../utilities';

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

    const loadDataToPage = () => {
        if (!transaction) {
            getTransaction(page);
        } else {
            const { data, totalPage, totalData } = transaction;

            if (transactions && transactions.length !== 0) {
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
    };

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

        loadDataToPage();
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
        put(
            '/transactions',
            {
                ids: selected,
            },
            (success) => {
                getTransaction(page);
                alert('Data berhasil dihapus', 'success');
                loadDataToPage();
                setD('');
                setLoading(false);
                setSelected([]);
                setDeleting(false);
                setEditing(false);
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

    const editingButton = () => {
        setEditing(true);
        setDeleting(false);
    };

    const deletingButton = () => {
        setEditing(false);
        setDeleting(true);
    };

    return (
        <div className={`container-fluid ${deleting && 'pl-5'}`}>
            <table className={`table table-hover table-bordered mb-0`}>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody className={`${d}`}>
                    {transactions && transactions.length > 0 ? (
                        transactions.map((tran) => (
                            <tr
                                key={tran.id}
                                onClick={(e) => {
                                    if (deleting) {
                                        if (
                                            !e.currentTarget.children[0]
                                                .children[0].checked
                                        ) {
                                            e.currentTarget.children[0].children[0].checked = true;
                                            setSelected((prevData) => [
                                                ...prevData,
                                                tran.id * 1,
                                            ]);
                                        } else {
                                            e.currentTarget.children[0].children[0].checked = false;
                                            setSelected((prevData) =>
                                                prevData.filter(
                                                    (i) =>
                                                        i !== tran.id * 1
                                                )
                                            );
                                        }
                                    }
                                }} style={{userSelect: deleting && 'none'}}
                            >
                                <td>
                                    {moment(tran.date).format('LL')}
                                    {deleting && (
                                        <input
                                            type="checkbox"
                                            className="position-absolute mt-2"
                                            id={tran.id}
                                            value={tran.id}
                                            style={{ left: '3%', userSelect: 'none', pointerEvents: 'none' }}
                                        />
                                    )}
                                </td>
                                <td>{tran.product.name}</td>
                                <td>
                                    {tran.type === 'sell' ? 'Jual' : 'Beli'}
                                </td>
                                <td>{tran.quantity}</td>
                                <td className="d-flex justify-content-between">
                                    Rp. {formatPrice(tran.price)}
                                    {auth && editing && (
                                        <Link
                                            to={`/transactions/edit?id=${tran.id}`}
                                        >
                                            <span
                                                className={`material-icons align-middle`}
                                                style={{ marginBottom: 2 }}
                                            >
                                                edit
                                            </span>
                                        </Link>
                                    )}
                                    {!editing && tran.info && (
                                        <InfoTooltip info={tran.info} />
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
                            <ModifyingButtons
                                editingButton={editingButton}
                                deletingButton={deletingButton}
                            />
                        )}
                        {editing && <div className="mt-1">{cancelButton}</div>}
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

            <DeleteModal deleteHandler={deleteData} selectedData={selected} />
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
