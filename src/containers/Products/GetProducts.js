import React, { useEffect, useState, Fragment } from 'react';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/product';
import { formatPrice } from '../../utilities';
import ModifyingButtons from '../../components/ModifyingButtons';

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
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getProducts(page);
    }, [page]);

    useEffect(() => {
        if (product === null) {
            getProducts(page);
        }
    }, []);

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
            getProducts(page);
        } else {
            const { data, totalPage, totalData } = product;

            if (products && products.length !== 0) {
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
    }, [page, history.location, product, products]);

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

    const editingButton = () => {
        setEditing(true);
        setDeleting(false);
    };

    const deletingButton = () => {
        setEditing(false);
        setDeleting(true);
    };

    const cancelButton = (
        <button
            className="btn btn-secondary"
            onClick={() => {
                setDeleting(false);
                setEditing(false);
            }}
        >
            Cancel
        </button>
    );

    return (
        <div className="container-fluid">
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
                    {products && products.map((product) => (
                        <tr key={product.id} className={d}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{`Rp. ${formatPrice(product.price)}`}</td>
                            <td className="d-flex justify-content-between">
                                {product.owner.name}
                                {auth && (
                                    <Fragment>
                                        {editing && (
                                            <Link
                                                to={`/products/edit?id=${product.id}`}
                                            >
                                                <span
                                                    className={`material-icons align-middle`}
                                                    style={{ marginBottom: 2 }}
                                                >
                                                    edit
                                                </span>
                                            </Link>
                                        )}
                                        {deleting && (
                                            <span
                                                className={`material-icons align-middle text-danger`}
                                                style={{ marginBottom: 2, userSelect: 'none', cursor: 'pointer' }}
                                                
                                            >
                                                delete
                                            </span>
                                        )}
                                    </Fragment>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {auth && (
                <div className="d-flex justify-content-between">
                    <Link className="m-0" to="/products/add">
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
                    ) : null}
                    {editing || deleting ? (
                        <div className="mt-1">{cancelButton}</div>
                    ) : null}
                </div>
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
    getProducts: (page) => dispatch(getProducts(page)),
});

const mapStateToProps = (state) => ({
    product: state.product,
});

export default connect(mapStateToProps, mapDispatchToProps)(GetProducts);
