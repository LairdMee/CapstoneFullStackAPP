import React, {useState, useEffect} from 'react';
import { GoogleLogin } from 'react-google-login';
import Home from './Home';
import { refreshTokenSetup } from './utils/refreshToken';
import axios from 'axios';
import { UserContext, LoginConext } from './Context';
import { Redirect, HashRouter, Route } from 'react-router-dom';

const clientId = '432537105194-kq0otevl96rui9cs4kgnuekv82tf8bqe.apps.googleusercontent.com';

function Login() {
  const ctx = React.useContext(UserContext);  
  const ltx = React.useContext(LoginConext);
  const [loginStatus, setLoginStatus] = useState('')

  useEffect(() => {
    if(loginStatus == "SIGNED_IN")
    {
      return (
        <HashRouter>
          <div><Redirect to="http://localhost:3000/#/" />
          <Route path="/" exact component={Home} />
          </div>
        </HashRouter>
      )
    }
  });

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    axios({
      method: "POST",
      url: "http://localhost:3300/account/googlelogin",
      headers: {"Content-Type": "application/json"},
      data: JSON.stringify({ tokenId: res.tokenId })
    }).then(response => {
      console.log("Google login success", response);

      const id = response.data.user._id
      const name = response.data.user.displayName
      const email = response.data.user.email
      const balance = 0
      const loggedInStatus = "SIGNED_IN"
      console.log(response.data);

      ctx.users.push({id,name,email,balance});
      ltx.loginStatus = loggedInStatus;
      setLoginStatus(loggedInStatus);

    }).catch(error => {
      console.log("check login error", error);
    });

    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Failed to login.'
    );
  };

    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        />
      </div>
    );
}

  export default Login;