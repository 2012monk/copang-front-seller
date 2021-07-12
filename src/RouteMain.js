import {
  autoLoginWithAccessToken,
  getCookie,
  auth,
} from "./_actions/seller_actions";
import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Pages/hoc/auth";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/Component/LoginPage";
import RegisterSellerPage from "./Seller/Component/RegisterSellerPage";

import DrawerMenu from "./Pages/Component/DrawerMenu/DrawerMenu.js";
import Menu from "./Menu";

const RouteMain = () => {
  return (
    <div>
      {/* 자동로그인 */}
      {autoLoginWithAccessToken()}
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ minWidth: "940px", maxWidth: "1280px", margin: "auto" }}>
          <Switch>
            <Route exact path="/" component={Auth(MainPage, true)} />
            <Route path="/login" component={Auth(LoginPage, false)} />
            <Route
              path="/sellerRegister"
              component={Auth(RegisterSellerPage, false)}
            />
          </Switch>
        </div>
      </Suspense>
    </div>
  );
};

export default RouteMain;
