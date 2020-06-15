import React, { useEffect, useState } from 'react';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTransactions } from '../../redux/actions/transaction';
import moment from 'moment';
import 'moment/locale/id';

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

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
        getTransaction(page);
    }, []);

    useEffect(() => {
        setLoading(true);
        const search = history.location.search;

        if (search.includes('page')) {
            setPage(search.substring(6) * 1);
        } else {
            history.push(`/transactions/get?page=${page}`);
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

    return (
        <div className="container-fluid">
            <table className={`table table-striped table-bordered mb-0`}>
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
                                <td>{moment(tran.date).format('LL')}</td>
                                <td>{tran.product.name}</td>
                                <td>Rp. {numberWithCommas(tran.price)}</td>
                                <td className="d-flex justify-content-between">
                                    {tran.quantity}
                                    {auth && (
                                        <Link
                                            to={`/transactions/edit?id=${tran.id}&date=${moment(tran.date).format('YYYY-MM-DD')}&product_id=${tran.product.id}&quantity=${tran.quantity}`}
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
                <Link className="m-0" to="/transactions/add">
                    <span className="material-icons" style={{ fontSize: 30 }}>
                        add_box
                    </span>
                </Link>
            )}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
    getTransaction: (page) => dispatch(getTransactions(page)),
});

const mapStateToProps = (state) => ({
    transaction: state.transaction,
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(GetTransaction);
