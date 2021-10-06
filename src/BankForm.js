import React from 'react';
import { UserContext, Card }  from './Context'

function BankForm(props){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
  
    function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if(label == 'password' &&  field.length < 8){
          setStatus('Error: ' + label + 'must be more than 8 characters');
          return false;
      }
      return true;
  }

  if(props.label == 'Deposit')
  {
    return (
      <Card
      bgcolor="warning"
      header={props.label}
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <CreateMsg setShow={setShow} successButtonMessage={props.successButton}/>}
    />
    )
  }

  if(props.label == "Balance")
  {
    return (
      <Card
      bgcolor="info"
      header={props.label}
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <CreateMsg setShow={setShow} successButtonMessage={props.successButton}/>}
    />
    )
  }

  if(props.label == "Withdraw")
  {
    return (
      <Card
        bgcolor="success"
        header={props.label}
        status={status}
        body={show ? 
          <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
          <CreateMsg setShow={setShow} successButtonMessage={props.successButton}/>}
      />
    )
  }

  if(props.label == "Create Account")
  {
    return (
      <Card
      bgcolor="primary"
      header={props.label}
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} /> : 
        <CreateMsg setShow={setShow} successButtonMessage={props.successButton}/>}
      />
    )
  }

    function CreateForm(props){
      const [name, setName]         = React.useState('');
      const [email, setEmail]       = React.useState('');
      const [password, setPassword] = React.useState('');
      const [balance, setBalance]   = React.useState('');
      const ctx = React.useContext(UserContext);  
     
      function handle(){
        console.log(name,email,password);
        setBalance(0);
        if (!validate(name, 'name'))     return;
        if (!validate(email,  'email'))    return;
        if (!validate(password, 'password')) return;
        ctx.users.push({name,email,password, balance});
        props.setShow(false);
      }    
     
      return (<>
     
        Name<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter name" 
          value={name} 
          onChange={e => setName(e.currentTarget.value)} /><br/>
     
        Email address<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}/><br/>
     
        Password<br/>
        <input type="password" 
          className="form-control" 
          placeholder="Enter password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)}/><br/>
     
        <button type="submit" 
          className="btn btn-light" 
          onClick={handle}>Create Account</button>
     
      </>);
      }

      function DepositForm(props){
        const [email, setEmail]   = React.useState('');
        const [amount, setAmount] = React.useState('');
        const ctx = React.useContext(UserContext);  
       
        function handle(){
          console.log(email,amount);
          const user = ctx.users.find((user) => user.email == email);

          if (!user) {
            props.setStatus('fail!');
            return;      
          }
          
          user.balance = user.balance + Number(amount);
          console.log(user);
          props.setStatus('');      
          props.setShow(false);
        }
       
        return(<>
       
          Email<br/>
          <input type="input" 
            className="form-control" 
            placeholder="Enter email" 
            value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            
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

        function BalanceForm(props){
          const [email, setEmail]   = React.useState('');
          const [balance, setBalance] = React.useState('');  
          const ctx = React.useContext(UserContext);  
         
          function handle(){
            const user = ctx.users.find((user) => user.email == email);
            if (!user) {
              props.setStatus('fail!')      
              return;      
            }
         
            setBalance(user.balance);
            console.log(user);
            props.setStatus('Your balance is: ' + user.balance);      
            props.setShow(false);
          }
         
          return (<>
         
            Email<br/>
            <input type="input" 
              className="form-control" 
              placeholder="Enter email" 
              value={email} 
              onChange={e => setEmail(e.currentTarget.value)}/><br/>
         
            <button type="submit" 
              className="btn btn-light" 
              onClick={handle}>
                Check Balance
            </button>
         
          </>);
        } 
        
        function WithdrawForm(props){
          const [email, setEmail]   = React.useState('');
          const [amount, setAmount] = React.useState('');
          const ctx = React.useContext(UserContext);  
         
          function handle(){
            console.log(email,amount);
            const user = ctx.users.find((user) => user.email == email);
            if (!user) {
              props.setStatus('fail!')      
              return;      
            }
        
            user.balance = user.balance - Number(amount);
            console.log(user);
            props.setStatus('');      
            props.setShow(false);
          }
          return(<>
               
            Email<br/>
            <input type="input" 
              className="form-control" 
              placeholder="Enter email" 
              value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              
            Amount<br/>
            <input type="number" 
              className="form-control" 
              placeholder="Enter amount" 
              value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
         
            <button type="submit" 
              className="btn btn-light" 
              onClick={handle}>Withdraw</button>
         
          </>); 
        
        }

      function CreateMsg(props){
        return(<>
          <h5>Success</h5>
          <button type="submit" 
            className="btn btn-light" 
            onClick={() => props.setShow(true)}>{props.successButtonMessage}</button>
        </>);
      }
  }

  export default BankForm;