import React from 'react';
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import Header from './Component/Header.js';
import DrawerMenu from './Component/DrawerMenu/DrawerMenu.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AddNewProductApp from '../AddNewProduct/AddNewProductApp.js';
import Divider from '@material-ui/core/Divider';
import Auth from "./hoc/auth";
export default function MainPage(props) {
    const lightTheme = createMuiTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#fff'
            },
        },
    });
    const darkTheme = createMuiTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#252525'
            },
        },
    });
    return (
        <>
            <ThemeProvider theme={darkTheme}>

                <Divider orientation="vertical" flexItem />
                <BrowserRouter>
                    <Header />
                    <DrawerMenu />
                    <Switch>
                        <Route path="/addproduct" style={{ maxWidth: "70%" }} component={AddNewProductApp} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </>


    );
}