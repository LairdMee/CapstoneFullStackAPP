import React from 'react';
import BankForm from './BankForm';
import { UserContext, Card }  from './Context'

function Deposit(props) {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  const userEmail = props.user.email;
  const accType = props.accountType;
  
  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus} email={userEmail} type={accType} /> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState(props.email);
  const [amount, setAmount] = React.useState('');
  const accountTypes = props.type;
  let [account, setAccount] = React.useState(accountTypes.length != 0 ? accountTypes[0].split("-")[1]: "");


  function handleChange(e) {
    setAccount(e.target.value.split("-")[1]);
  }


  function handle(){
    if (amount < 0)
    {
      props.setStatus('Amount cannot be negative');
    }
    else{
      fetch(`http://localhost:3300/account/update/${email}/${account}/${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              props.setStatus('Deposited Successfully');
              props.setShow(false);
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log('err:', text);
          }
      });
    }
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <select onChange={handleChange}>
         {accountTypes.map(acc => {
           return (
             <option value={acc}> {acc} </option>
           )
         })}
    </select> <br/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light"
      onClick={handle}>Deposit</button>

  </>);
}
  export default Deposit;