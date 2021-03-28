import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddNgo';
import Home from './core/Home';
import Ngocard from './core/Ngocard';
import Ngodetails from './core/Ngodetails';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/private" exact component={Private} />
                <PrivateRoute path="/NgoCard" exact component={Ngocard} />
                <PrivateRoute path="/Ngo/:productId" exact component={Ngodetails} />
                <AdminRoute path="/admin" exact component={Admin} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/ngo" exact component={AddProduct} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
