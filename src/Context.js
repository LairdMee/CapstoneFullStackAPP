import React from 'react';
import { BrowserRouter } from 'react-router-dom'

//const Route       = ReactRouterDOM.Route;
//const Link        = ReactRouterDOM.Link;
//const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(); 
// const UserContext = React.createContext({user: {}});
const LoginConext = React.createContext();
 
function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }
 
  return (
    <div className={classes()} style={{maxWidth: "40rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>      
  );    
}

  export { UserContext, LoginConext, Card }