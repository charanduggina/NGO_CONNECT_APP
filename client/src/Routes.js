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
import Volunteer from './core/Volunteer';
import Donatepage from './core/Donate';
import Payment from './core/payment';
import ManageProducts from './admin/ManageProducts';
import UpdateNgo from './admin/UpdateNgo';
import Orders from './admin/Orders';
import Userhistory from './core/Userhistory';
import statsadmin from './core/statsadmin';
import indexRoutes from './src/routes/index.jsx';      
import "./src/assets/scss/style.css";                
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
                <PrivateRoute path="/Ngo/volunteer/:productId" exact component={Volunteer} />
                <PrivateRoute path="/Ngo/donate/:productId" exact component={Donatepage} />
                <PrivateRoute path="/amount/donate/:productId" exact component={Payment} />
                <PrivateRoute path="/User/Donations" exact component={Userhistory} />
                <AdminRoute path="/admin" exact component={Admin} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/ngo" exact component={AddProduct} />
                <AdminRoute path="/admin/Ngo" exact component={ManageProducts} />
                <AdminRoute path="/admin/ngo/update/:productId" exact component={UpdateNgo} />
                <AdminRoute path="/admin/Donations" exact component={Orders} />
                <Route path="/stats" exact component={statsadmin} />
                <Route exact path="/dashboard">
          {indexRoutes.map((prop, key) => {
            return (
              <Route path={prop.path} key={key} component={prop.component} />
            );
          })}
        </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
