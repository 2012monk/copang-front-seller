import {
  autoLoginWithAccessToken,
  getCookie,
  auth,
} from "./_actions/seller_actions";
import React, { Suspense } from "react";
import { Switch, Route, useRoute } from "react-router-dom";
import Auth from "./Pages/hoc/auth";
import AddNewProductApp from "./AddNewProduct/AddNewProductApp.js";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/Component/LoginPage";
import RegisterSellerPage from "./Seller/Component/RegisterSellerPage";
import Header from "./Pages/Component/Header";
import OrderMgrPage from "./Pages/OrderMgrPage";
// import {routes} from './routes.js';

const RouteMain = () => {
  return (
    <>
      {/* 자동로그인 */}
      {autoLoginWithAccessToken()}
      <div style={{ minWidth: '940px', maxWidth: '1280px', margin: 'auto' }}>


        {/* <Header /> */}
        <Switch>
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route
            path="/sellerRegister"
            component={Auth(RegisterSellerPage, false)}
          />
          <Route path="/" component={Auth(MainPage, true)} />
        </Switch>

        {/* <Route path="/addproduct" component={Auth(AddNewProductApp, true)} />
          <Route path="/ordermgr" component={Auth(OrderMgrPage, true)} /> */}
      </div>
    </>
  );
};

export default RouteMain;
