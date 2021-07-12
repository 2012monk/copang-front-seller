import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import { loginSeller, getCookie } from "../../_actions/seller_actions";
import { useDispatch } from "react-redux";

import axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const onUsernameHandler = (e) => {
    setUsername(e.currentTarget.value);
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const onSubmitHandler = (e) => {
    console.log("SubmitHandler 시작");
    setTimeout((e) => {
      let dataToSubmit = {
        username: Username,
        password: Password,
      };

      dispatch(loginSeller(dataToSubmit))
        .then((response) => {
          const accessToken = response.payload.data.access_token;
          if (response.payload.message === "success") {
            window.localStorage.setItem(
              "userId",
              response.payload.data.username
            );
            window.localStorage.setItem("accessToken", accessToken);
            document.cookie = `accessToken=${accessToken}`;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${getCookie("accessToken")}`;
            props.history.push("/");
          } else {
            setFormErrorMessage("비밀번호 또는 계정을 확인해주세요");
          }
        })

        .catch((err) => {
          setFormErrorMessage("비밀번호 또는 계정을 확인해주세요");
          setTimeout(() => {
            setFormErrorMessage("로그인 실패");
          }, 3000);
        });
    }, 500);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SELLER
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            //autoComplete="email"
            onChange={onUsernameHandler}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordHanlder}
          />
          <div>
            {formErrorMessage && (
              <label>
                <p style={{ color: "#ff0000bf", fontSize: "0.7rem" }}>
                  {formErrorMessage}
                </p>
              </label>
            )}
          </div>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitHandler}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sellerRegister">회원가입</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default withRouter(LoginPage);
