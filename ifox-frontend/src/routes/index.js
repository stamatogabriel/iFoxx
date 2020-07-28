import React from "react";

import { Switch } from "react-router-dom";

import Route from "./Route";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/UserList";
import SellersList from "../pages/SellersList";
import DriversList from "../pages/DriversList";
import EnterprisesList from "../pages/EnterprisesList";
import StoragesList from "../pages/StoragesList";
import ProductList from "../pages/ProductList";
import TrucksList from "../pages/TrucksList";
import ContractsList from "../pages/ContractsList";
import SellsList from "../pages/SellsList";
import OrdersList from "../pages/OrdersList";
import SellViewer from "../pages/SellViewer";
import OrderViewer from "../pages/OrderViewer";
import Profile from '../pages/Profile'
import Group from "../pages/GroupList";
import EnterpriseTypeList from '../pages/EnterpriseTypeList';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Dashboard} isPrivate />
    <Route path="/users" component={UserList} isPrivate />
    <Route path="/sellers" component={SellersList} isPrivate />
    <Route path="/drivers" component={DriversList} isPrivate />
    <Route path="/enterprises" component={EnterprisesList} isPrivate />
    <Route path="/storages" component={StoragesList} isPrivate />
    <Route path="/products" component={ProductList} isPrivate />
    <Route path="/trucks" component={TrucksList} isPrivate />
    <Route path="/contracts" component={ContractsList} isPrivate />
    <Route path="/sells/view/:id" component={SellViewer} isPrivate />
    <Route path="/sells" component={SellsList} isPrivate />
    <Route path="/orders/view/:id" component={OrderViewer} isPrivate />
    <Route path="/orders" component={OrdersList} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path='/groups' component={Group} isPrivate />
    <Route path='/enterprise_type' component={EnterpriseTypeList} isPrivate />
  </Switch>
);

export default Routes;
