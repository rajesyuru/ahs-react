import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import GetProducts from './Products/GetProducts';
import AddProduct from './Products/AddProduct';
import EditProduct from './Products/EditProduct';

const Product = ({history, user}) => {

    const [me, setMe] = useState({})

    useEffect(() => {
        if (user) {
            setMe(user);
        } else {
            history.push('/');
            alert('Anda belum login. Silahkan login terlebih dahulu')
        };
    }, []);

    return (
        <Switch>
            <Route
                path="/products/get"
                component={(props) => <GetProducts {...props} user={me} />}
            />
            <Route path="/products/add" component={AddProduct} />
            <Route path="/products/edit" component={EditProduct} />
        </Switch>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Product);
