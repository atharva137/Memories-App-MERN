// import libraries
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import action types
import { AUTH } from '../../constants/actionTypes';
// import dotenv
import dotenv from "dotenv";
// import icon
import Icon from './icon';
// import styles
import useStyles from './styles';
dotenv.config();
const SignUp = () => {
  // eslint-disable-next-line 
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // eslint-disable-next-line 
  const switchMode = () => {

    setIsSignup((prevIsSignup) => !prevIsSignup);
  };


  // google success info
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };


  // Error info if login fails
  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  // JSX

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6">Login with Google accounts</Typography>

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // Google Client id must be your own 
          render={(renderProps) => (
            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess} // calling google success
          onFailure={googleError}  // google error
          cookiePolicy="single_host_origin"
        />


      </Paper>
    </Container>
  );
};

export default SignUp;
