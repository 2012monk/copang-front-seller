import React from 'react';
import { Link, Switch, Route } from "react-router-dom";
import Header from './Component/Header.js';
import DrawerMenu from './Component/DrawerMenu/DrawerMenu.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
        <div>

            <ThemeProvider theme={darkTheme}>

                <Header />

                <DrawerMenu />
            </ThemeProvider>

        </div>

    );
}