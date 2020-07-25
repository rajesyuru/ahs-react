import React, { useEffect, useState, Fragment } from 'react';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTransactions } from '../../redux/actions/transaction';
import moment from 'moment';
import 'moment/locale/id';
import { del } from '../../axios';
import InfoTooltip from '../../components/InfoTooltip';
import { formatPrice, checkAdminMerchant } from '../../utilities';
import DeleteModal from '../../components/DeleteModal';
import { setLoading } from '../../redux/actions/loading';
import TableLoadingSpinner from '../../components/TableLoadingSpinner';

const GetTransaction = ({
    alert,
    getTransaction,
    transaction,
    history,
    user,
    loading,
    setLoading,
}) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState([]);
    const [delId, setDelId] = useState(-1);

    useEffect(() => {
        getTransaction(page);
    }, [page]);

    useEffect(() => {
        if (loading) {
            setTotalPage(() => {
                let a = [];
                for (
                    let i = 1;
                    i <= (transaction ? transaction.totalPage : 1);
                    i++
                ) {
                    a.push(i);
                }
                return a;
            });
        }
    }, [transaction]);

    const activeNav = (type) => {
        if (loading) {
            return 'disabled';
        }
        if (type === 'prev') {
            if (page === 1) {
                return 'disabled';
            }
        } else {
            if (!transaction || transaction.totalPage < 1) {
                return 'disabled';
            } else if (page === transaction.totalPage) {
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

    const deleteData = () => {
        setLoading(true);
        if (delId < 0) {
            setLoading(false);
            return alert('Telah terjadi kesalahan');
        }
        del(
            `/transactions/${delId}`,
            (success) => {
                alert('Data berhasil dihapus', 'success');
                getTransaction(page);
                setLoading(false);
                setDelId(-1);
            },
            (error) => {
                alert('Telah terjadi kesalahan');
                getTransaction(page);
                setLoading(false);
                setDelId(-1);
            }
        );
    };

    return (
        <div className="container-fluid">
            <Link
                className={`btn btn-primary mb-2 p-2 ${
                    checkAdminMerchant(user) ? '' : 'disabled'
                }`}
                to="/transactions/add"
            >
                Add Transaction
                <span className="material-icons align-middle ml-1">add</span>
            </Link>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Customer</th>
                        {checkAdminMerchant(user) ? (
                            <th scope="col" className="text-center">
                                Actions
                            </th>
                        ) : null}
                    </tr>
                </thead>
                <tbody>
                    {!loading ? transaction && transaction.data && transaction.data.length > 0 ? (
                        transaction.data.map((tran) => (
                            <tr key={tran.id}>
                                <td>{moment(tran.date).format('LL')}</td>
                                <td>{tran.product.name}</td>
                                <td>
                                    {tran.type === 'sell' ? 'Jual' : 'Beli'}
                                </td>
                                <td>{tran.quantity}</td>
                                <td>
                                    Rp.{' '}
                                    {formatPrice(
                                        tran.type === 'sell'
                                            ? tran.price
                                            : tran.buying_price
                                    )}
                                </td>
                                <td className="d-flex justify-content-between">
                                    {tran.customer ? tran.customer.name : '~'}
                                    {tran.info && (
                                        <InfoTooltip info={tran.info} />
                                    )}
                                </td>
                                {checkAdminMerchant(user) ? (
                                    <td className="text-center">
                                        <Link
                                            to={`/transactions/edit?id=${tran.id}`}
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
                                            onClick={(e) => setDelId(tran.id)}
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
                            <td colSpan="7" className="text-center">
                                Belum ada transaksi, silahkan tambahkan
                                transaksi
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                <TableLoadingSpinner loading={loading} />
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
            <DeleteModal deleteHandler={deleteData} />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
    getTransaction: (page) => dispatch(getTransactions(page)),
    setLoading: (loading) => dispatch(setLoading(loading)),
});

const mapStateToProps = (state) => ({
    transaction: state.transaction,
    user: state.user,
    loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(GetTransaction);
