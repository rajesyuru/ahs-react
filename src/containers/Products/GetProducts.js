import React, { useEffect, useState } from 'react';
import { addAlert } from '../../redux/actions/alert';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/product';
import { formatPrice } from '../../utilities';
import { checkAdminMerchant } from '../../utilities';
import { setLoading } from '../../redux/actions/loading';
import DeleteModal from '../../components/DeleteModal';
import { del } from '../../axios';
import TableLoadingSpinner from '../../components/TableLoadingSpinner';

const GetProducts = ({
    history,
    alert,
    user,
    getProducts,
    product,
    loading,
    setLoading,
}) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState([]);
    const [delId, setDelId] = useState(-1);
    const [queryName, setQueryName] = useState('');

    useEffect(() => {
        getProducts(page, queryName);
    }, [page]);

    useEffect(() => {
        if (loading) {
            setTotalPage(() => {
                let a = [];
                for (
                    let i = 1;
                    i <= (product && product.totalPage ? product.totalPage : 1);
                    i++
                ) {
                    a.push(i);
                }
                return a;
            });
        }
    }, [product]);

    const activeNav = (type) => {
        if (loading) {
            return 'disabled';
        }
        if (type === 'prev') {
            if (page === 1) {
                return 'disabled';
            }
        } else {
            if (!product || product.totalPage < 1) {
                return 'disabled';
            } else if (page === product.totalPage) {
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
            `/products/${delId}`,
            (success) => {
                alert('Berhasil menghapus data', 'success');
                getProducts(page);
                setLoading(false);
                setDelId(-1);
            },
            (error) => {
                alert('Berhasil menghapus data', 'success');
                getProducts(page);
                setLoading(false);
                setDelId(-1);
            }
        );
    };

    const searchName = (e) => {
        e.preventDefault();

        getProducts(1, queryName);
    };

    const inputOnChange = (e) => {
        if (e.target.value.length === 0) {
            getProducts(page, '');
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
                    to="/products/add">
                    Add Product
                    <span className="material-icons align-middle ml-1">
                        add
                    </span>
                </Link>
                <form
                    className="input-group w-25 h-100 mt-1"
                    onSubmit={searchName}>
                    <input
                        type="text"
                        className="form-control"
                        onChange={inputOnChange}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-primary"
                            type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Buying Price</th>
                        {user.merchant_id === null ? (
                            <th scope="col">Merchant</th>
                        ) : null}
                        {checkAdminMerchant(user) ? (
                            <th scope="col" className="text-center">
                                Actions
                            </th>
                        ) : null}
                    </tr>
                </thead>
                <tbody>
                    {!loading ? product && product.data && product.data.length > 0 ? (
                        product.data.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{`Rp. ${formatPrice(product.price)}`}</td>
                                <td>{`Rp. ${formatPrice(
                                    product.buying_price
                                )}`}</td>
                                {user.merchant_id === null ? (
                                    <td> {product.owner.name} </td>
                                ) : null}
                                {checkAdminMerchant(user) ? (
                                    <td className="text-center">
                                        <Link
                                            to={`/products/edit?id=${product.id}`}
                                            className="mr-2">
                                            <span
                                                className={`material-icons align-middle text-primary`}
                                                style={{ marginBottom: 2 }}
                                                title="Edit">
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
                                            onClick={(e) =>
                                                setDelId(product.id)
                                            }
                                            title="Delete">
                                            delete
                                        </span>
                                    </td>
                                ) : null}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={
                                    checkAdminMerchant(user)
                                        ? 5
                                        : user.merchant_id === null
                                        ? 5
                                        : 4
                                }
                                className="text-center">
                                {queryName.length > 0
                                    ? 'Produk tidak ditemukan'
                                    : checkAdminMerchant(user)
                                    ? 'Belum ada produk, silahkan tambahkan produk'
                                    : 'Belum ada produk'}
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td
                                colSpan={
                                    checkAdminMerchant(user)
                                        ? 5
                                        : user.merchant_id === null
                                        ? 5
                                        : 4
                                }
                                className="text-center">
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
                            onClick={() => setPage(page - 1)}>
                            Previous
                        </button>
                    </li>
                    {totalPage.map((number) => (
                        <li
                            className={`page-item ${activePage(number)}`}
                            key={number}>
                            <button
                                className="page-link"
                                onClick={() => setPage(number)}>
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${activeNav('next')}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage(page + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>
            <DeleteModal
                deleteHandler={deleteHandler}
                additionalText="All transactions related to this product will also be deleted."
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    alert: (message, type) => dispatch(addAlert(message, type)),
    getProducts: (page, name) => dispatch(getProducts(page, name)),
    setLoading: (loading) => dispatch(setLoading(loading)),
});

const mapStateToProps = (state) => ({
    product: state.product,
    loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(GetProducts);
