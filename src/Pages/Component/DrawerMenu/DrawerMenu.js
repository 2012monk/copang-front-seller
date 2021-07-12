import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Header from '../Header.js';
import StoreIcon from '@material-ui/icons/Store';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Store from '@material-ui/icons/Store';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
const drawerWidth = 240;

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

export default function DrawerMenu(props) {
  // const [myTheme, setMyTheme] = useState(darkTheme);
  const classes = useStyles();
  return (

    <div>

      <div className={classes.root}>

        <CssBaseline />
        
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>

              <ListItem button key="상품 등록">
                <ListItemIcon><StoreIcon /></ListItemIcon>
                <Link to="/addproduct">
                  <ListItemText primary={"상품 등록"} />
                </Link>
              </ListItem>
              <ListItem button key="주문 관리">
                <ListItemIcon><StoreIcon /></ListItemIcon>
                <Link to="/">
                  <ListItemText primary={"주문 관리"} />
                </Link>
              </ListItem>
              <ListItem button key="배송 관리">
                <ListItemIcon><LocalShippingIcon /></ListItemIcon>
                <ListItemText primary={"배송 관리"} />
              </ListItem>

            </List>

            <Divider />
            <List>
              <ListItem button key="고객 문의">
                <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                <ListItemText primary={"고객 문의"} />
              </ListItem>

              {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))} */}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Typography paragraph>
          </Typography>
          <Typography paragraph>
          </Typography>
        </main>
      </div>
    </div>
  );
}