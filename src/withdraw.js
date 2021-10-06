import React from 'react';
import { UserContext, Card }  from './Context'

function Withdraw(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const userEmail = props.user.email;
  const accType = props.accountType;

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} email={userEmail} type={accType} /> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState(props.email);
  const [amount, setAmount] = React.useState('');
  let balance = 0;

  const accountTypes = props.type;
  let [account, setAccount] = React.useState(accountTypes.length != 0 ? accountTypes[0].split("-")[1]: "");

  function handleChange(e) {
    setAccount(e.target.value.split("-")[1]);
  }

  function handle()
  {
    fetch(`http://localhost:3300/account/bank/findOne/${account}`)
    .then(response => response.text())
    .then(text => {
            const jsonText = JSON.parse(text);
            balance = jsonText.balance;
            if (amount > balance){
              props.setStatus("Amount cannot be greater than balance");
            }
            else if (amount < 0){
              props.setStatus("Amount must not be negative");
            }
            else
            {
              fetch(`http://localhost:3300/account/update/${email}/${account}/-${amount}`)
              .then(response => response.text())
              .then(text => {
                  try {
                      props.setStatus("Withdrawn Successfully");
                      props.setShow(false);
                  } catch(err) {
                      props.setStatus('Withdraw failed')
                      console.log('err:', text);
                  }
              });
            }
    });
  }


  return(<>

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

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}

export default Withdraw;