import React, { useEffect, useState, Fragment } from 'react';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/product';

const GetProducts = ({ history, alert, user, getProducts, product }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(
        history.location.search ? history.location.search.substring(6) * 1 : 1
    );
    const [totalPage, setTotal] = useState(1);
    const [d, setD] = useState('d-none');
    const [paging, setPaging] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalProduct, setTotalProduct] = useState(1);
    const [auth, setAuth] = useState(false);
    const [limit, setLimit] = useState(10);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
        getProducts(page, limit);
    }, [limit]);

    useEffect(() => {
        setLoading(true);
        const search = history.location.search.substring(1);

        if (
            !search.includes('page') &&
            history.location.pathname === '/products/get'
        ) {
            if (page !== 1) {
                history.push(`/products/get?page=${page}`);
            }
        } else {
            setPage(search.substring(5) * 1);
        }

        if (user.merchant_id !== null && user.group_id === 1) {
            setAuth(true);
        }

        if (product === null) {
            getProducts(page, limit);
        } else {
            const { data, totalPage, totalData } = product;

            if (products.length !== 0) {
                setProducts(data);
                setInterval(() => {
                    setLoading(false);
                    setD(() => '');
                }, 1000);
                setTotal(totalPage);
                setTotalProduct(totalData);
                setPaging(() => {
                    let a = [];
                    for (let i = 1; i <= totalPage; i++) {
                        a.push(i);
                    }
                    return a;
                });
            } else {
                setProducts(data);
            }
        }
    }, [page, history.location, product, products, limit]);

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
            <div className="form-inline my-2">
                <label htmlFor="number" className="mr-2">
                    Show entries:
                </label>
                <select
                    id="number"
                    className="form-control form-control-sm"
                    onChange={(e) => setLimit(e.target.value)}
                    defaultValue={10}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <table className={`table table-striped table-bordered mb-0`}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Merchant</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className={d}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{`Rp. ${numberWithCommas(product.price)}`}</td>
                            <td className="d-flex justify-content-between">
                                {product.owner.name}
                                {auth ? (
                                    <Link
                                        to={`/products/edit?id=${product.id}&name=${product.name}&price=${product.price}`}
                                    >
                                        <span
                                            className={`material-icons align-middle`}
                                            style={{ marginBottom: 2 }}
                                        >
                                            edit
                                        </span>
                                    </Link>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {auth && (
                <Link className="m-0" to="/products/add">
                    <span className="material-icons" style={{ fontSize: 30 }}>
                        add_box
                    </span>
                </Link>
            )}

            <p className="font-weight-bold">Total: {totalProduct}</p>
            <div className="d-flex justify-content-around">
                <ul className="pagination">
                    <li className={`page-item ${activeNav('prev')}`}>
                        <Link
                            className="page-link"
                            to={{ search: `?page=${page - 1}` }}
                        >
                            Previous
                        </Link>
                    </li>
                    {paging.map((number) => (
                        <li
                            className={`page-item ${activePage(number)}`}
                            key={number}
                        >
                            <Link
                                className="page-link"
                                to={{ search: `?page=${number}` }}
                            >
                                {number}
                            </Link>
                        </li>
                    ))}
                    <li className={`page-item ${activeNav('next')}`}>
                        <Link
                            className="page-link"
                            to={{ search: `?page=${page + 1}` }}
                        >
                            Next
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message) => dispatch(addAlert(message)),
    getProducts: (page, limit) => dispatch(getProducts(page, limit)),
});

const mapStateToProps = (state) => ({
    product: state.product,
});

export default connect(mapStateToProps, mapDispatchToProps)(GetProducts);
