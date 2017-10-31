import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import DataContainer from './data/DataContainer';
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
            <li><NavLink to="/account/data" activeClassName="active-link">Data</NavLink></li>
          </ul>
        </div>

        <Switch>
          <Route path="/account/info" component={Info}/>
          <Route path="/account/payment" component={Payment}/>
          <Route path="/account/auth" component={Auth}/>
          <Route path="/account/data" component={DataContainer}/>
        </Switch>

      </div>
    </Router>

    );
  }
}

export default Account;
