import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './Component/Header.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AddNewProductApp from '../AddNewProduct/AddNewProductApp.js';
import Auth from "./hoc/auth";
import OrderMgrPage from './OrderMgrPage.js';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: '',

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

export default function MainPage(props) {
    const classes = useStyles();
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

                {/* <Divider orientation="vertical" flexItem /> */}


                <Header />
                <Switch>

                    <Route exact path="/addproduct" component={AddNewProductApp} />
                    <Route path="/ordermgr" component={OrderMgrPage} />
                    
                </Switch>

            </ThemeProvider>

        </>

    );
}