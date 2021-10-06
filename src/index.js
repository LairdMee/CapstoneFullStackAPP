import React, { useState, useEffect } from 'react';
import  { HashRouter, Route, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import ReactDOM from 'react-dom';
import NavBar from './Navbar';
import App from './App';
import Home from './Home';
import { refreshTokenSetup } from './utils/refreshToken';
import axios from 'axios';
import Login from './login';
import Deposit from './Deposit';
import Withdraw from './withdraw';
import Balance from './balance';
import AllData from './allData';
import { UserContext, LoginConext } from './Context';

import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './logout';
import BankAccount from './bankAccount';


function Spa() {
  const [user, setUser] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [accType, setAccountType] = useState([])
  const [isEmployee, setIsEmployee] = useState(false);

  const clientId = '1070674130433-171ritv30q9pbr74edf31mr1r5qgqhb4.apps.googleusercontent.com';

  useEffect(() => {
     
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
      const employee = response.data.user.Employee ? response.data.user.Employee : false;
      const loggedInStatus = "SIGNED_IN"

      const newUser = {id, name, email}

      setUser(newUser)
      setLoginStatus(loggedInStatus);
      setIsEmployee(employee);

      fetch(`http://localhost:3300/account/bank/find/${email}`)
      .then(response => response.text())
          .then(text => { 
            try {
              const jsonText = JSON.parse(text);
              Object.keys(jsonText).forEach(function(key) {
                accType.push(jsonText[key].accountType + "-" + jsonText[key].accountNumber);
              });
              setAccountType(accType);
            } catch(err) {
                console.log('err:', text);
            }
      });

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

  if (loginStatus != "SIGNED_IN") {
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
  else
  {
    return (
      <HashRouter>
        <div>
          <NavBar user={user} isEmployee ={isEmployee}/>   
          {/* <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>      */}
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path = "/account" render={() => <BankAccount user = {user} />}/>
              <Route path="/deposit/" render={() => <Deposit user={user} accountType={accType} />} />
              <Route path="/withdraw/" render={() => <Withdraw user={user} accountType={accType} />} /> 
              {/* <Route path="/transactions/" component={Transactions} /> */}
              <Route path="/balance/" render={() => <Balance user={user} accountType={accType}/>} />
              <Route path="/alldata/" component={AllData} />
              <Route path="/logout/" component={Logout} />
            </div>
            {/* </UserContext.Provider>  */}
        </div>
        
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);