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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b4e340914385f8718b51eae56374eea25727d4de
=======
>>>>>>> b79b38ffb17383133f8583f841d34bf55b85d799
=======

>>>>>>> 660d990aab8a11989cbf37aacbcc31ccdae8d636


const RouteMain = () => {
  return (
    <>
      {/* 자동로그인 */}
      {autoLoginWithAccessToken()}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======

<<<<<<< HEAD
>>>>>>> b79b38ffb17383133f8583f841d34bf55b85d799
=======
>>>>>>> 660d990aab8a11989cbf37aacbcc31ccdae8d636
      <div style={{ minWidth: '940px', maxWidth: '1280px', margin: 'auto' }}>

=======
>>>>>>> 63c61453f32aef78e2abc3fdd7aa6f5c81c484db

      <div style={{ minWidth: "940px", maxWidth: "1280px", margin: "auto" }}>

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b4e340914385f8718b51eae56374eea25727d4de
=======

>>>>>>> b79b38ffb17383133f8583f841d34bf55b85d799
=======
>>>>>>> 660d990aab8a11989cbf37aacbcc31ccdae8d636
=======
>>>>>>> 63c61453f32aef78e2abc3fdd7aa6f5c81c484db
  );
};

export default RouteMain;
