import Nav from  "react-bootstrap/Nav";

function NavBar(props){
    return(
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-color">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <Nav fill variant="pills" defaultActiveKey="#/">
            <Nav.Item>
              <Nav.Link className="navbar-brand" href="#/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#/account/" title="Accounts">Create Accounts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#/deposit/" title="Deposit Money">Deposit</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#/withdraw/" title="Withdraw Money">Withdraw</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#/balance/" title="Balance">Balance</Nav.Link>
            </Nav.Item>
            {props.isEmployee && (
              <Nav.Item>
              <Nav.Link href="#/alldata/" title="Display all your data">AllData</Nav.Link>
            </Nav.Item> 
            )}
            <Nav.Item>
              <Nav.Link href="#/logout/" title="Logout">Logout</Nav.Link>
            </Nav.Item> 
          </Nav>
        </div>
        <div className="navbar-collapse collapse w-40 order-1 dual-collapse2">
          <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  {props.user.name}
              </li>
          </ul>
      </div>
      </nav>
      </>
    );
  }

  export default NavBar;