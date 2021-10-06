import React from 'react';
import BankForm from './BankForm';
import { UserContext, Card }  from './Context'

function BankAccount(props) {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  const userEmail = props.user.email;
  
  return (
    <Card
      bgcolor="warning"
      header="Account"
      status={status}
      body={show ? 
        <BankAccountForm setShow={setShow} setStatus={setStatus} email={userEmail} /> :
        <BankAccountMessage setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function BankAccountMessage(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
         Create Another Account
    </button>
  </>);
} 

function BankAccountForm(props){
  const [email, setEmail]   = React.useState(props.email);
  const [type, setAccount] = React.useState('Checking');

  function handle(){
    fetch(`http://localhost:3300/account/create/${email}/${type}`)
      .then(response => response.text())
      .then(text => {
          try {
              props.setStatus('Account Created Successfully');
              props.setShow(false);
          } catch(err) {
              props.setStatus('Account Creation Failed')
              console.log('err:', text);
          }
      });
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
    
      <select 
        defaultValue={type} 
        onChange={e => setAccount(e.currentTarget.value)}
      >
       <option value="Checking">Checking</option>
       <option value="Savings">Savings</option>
      </select> <br/><br/>


    <button type="submit" 
      className="btn btn-light"
      onClick={handle}>Create Account</button>

  </>);
}
  export default BankAccount;