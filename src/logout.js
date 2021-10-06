import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const clientId =
  '1070674130433-171ritv30q9pbr74edf31mr1r5qgqhb4.apps.googleusercontent.com';

function Logout() {
  const history = useHistory();

  const onSuccess = () => {
    alert('Logout made successfully ✌');
    history.push("/");
    window.location.reload();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;