import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Auth from './hoc/auth';
import Layout from './hoc/layout'

import Comics from './components/Shop/comics/index';
import Home from './components/Home/index.js';
import RegisterLogin from './components/Register_login/index';
import Register from './components/Register_login/register';
import ProductPage from './components/Product/index';


import UserDashboard from './components/User/user';
import AddProduct from './components/User/Admin/add_product'
import ManageCatergories from './components/User/Admin/manage_catergories';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update_profile';
import StandingOrder from './components/User/standing_order';
import ManageSite from './components/User/Admin/manage_site';
import ManageStock from'./components/User/Admin/manage_stock';



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




      <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
      <Route path="/register" exact component={Auth(Register,null)}/>
      <Route path="/comics" exact component={Auth(Comics,null)}/>
      <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
      <Route path="/" exact component={Auth(Home,null)}/>
      
    </Switch>
    </Layout>
  );
};

export default Routes;