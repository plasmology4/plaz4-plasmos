import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import Auth from './Auth';
import Info from './Info';
import Payment from './Payment';

class Account extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <Router>
      <div>
      
        <div className="p4-menu-centered">
          <ul className="menu">
            <li><NavLink to="/account/info" activeClassName="active-link">Info</NavLink></li>
            <li><NavLink to="/account/payment" activeClassName="active-link">Payment</NavLink></li>
            <li><NavLink to="/account/auth" activeClassName="active-link">Auth</NavLink></li>
          </ul>
        </div>

        <Switch>
          <Route path="/account/info" component={Info}/>
          <Route path="/account/payment" component={Payment}/>
          <Route path="/account/auth" component={Auth}/>
        </Switch>

      </div>
    </Router>

    );
  }
}

export default Account;
