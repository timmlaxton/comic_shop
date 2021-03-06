import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Auth from './hoc/auth';
import Layout from './hoc/layout'

import Comics from './components/Shop/comics';
import Home from './components/Home';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import ProductPage from './components/Product';


import UserDashboard from './components/User/user';
import AddProduct from './components/User/Admin/add_product'
import ManageCatergories from './components/User/Admin/manage_catergories';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update_profile';
import StandingOrder from './components/User/standing_order';
import ManageSite from './components/User/Admin/manage_site';
import ManageStock from'./components/User/Admin/manage_stock';
import ReceivedOrders from './components/User/Admin/received_orders';
import EditProductPage from './components/User/Admin/edit_product'


const Routes = () => {
  return (
    <Layout> 
    <Switch>

      <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
      <Route path="/user/cart" exact component={Auth(UserCart,true)}/>
      <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
      <Route path="/admin/manage_catergories" exact component={Auth(ManageCatergories,true)}/>
      <Route path="/user/user_profile" exact component={Auth(UpdateProfile,true)}/>
      <Route path="/user/standing_order" exact component={Auth(StandingOrder,true)}/>
      <Route path="/admin/site_info" exact component={Auth(ManageSite,true)}/>
      <Route path="/admin/manage_stock" exact component={Auth(ManageStock,true)}/>
      <Route path="/admin/received_orders" exact component={Auth(ReceivedOrders,true)}/>
      <Route path="/product_detail/:id" exact component={ProductPage}/>
      <Route path="/product_detail/:id/edit" exact component={EditProductPage}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/register_login" exact component={RegisterLogin}/>
      <Route path="/comics" exact component={Comics}/>
      <Route path="/" exact component={Home}/>
      
    </Switch>
    </Layout>
  );
};

export default Routes;