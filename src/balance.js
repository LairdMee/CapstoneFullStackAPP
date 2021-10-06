import React from 'react';
import BankForm from './BankForm';
import { UserContext, Card } from './Context';

function Balance(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const userEmail = props.user.email; 
  const accType = props.accountType;

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} email={userEmail} type={accType} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState(props.email);
  const [balance, setBalance] = React.useState('');  

  const accountTypes = props.type;
  let [account, setAccount] = React.useState(accountTypes.length != 0 ? accountTypes[0].split("-")[1]: "");

  function handleChange(e) {
    setAccount(e.target.value.split("-")[1]);
  }

  function handle(){
    fetch(`http://localhost:3300/account/bank/findOne/${account}`)
    .then(response => response.text())
    .then(text => {
        try {
            const jsonText = JSON.parse(text);
            props.setStatus('Your balance is: ' + jsonText.balance);
            props.setShow(false);
            setBalance(text.balance);
        } catch(err) {
            props.setStatus('Failed to fetch balance');
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <select onChange={handleChange}>
         {accountTypes.map(acc => {
           return (
             <option value={acc}> {acc} </option>
           )
         })}
    </select> <br/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}

  export default Balance;