import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import DataContainer from './data/DataContainer';
import POContainer from './po/POContainer';
import VendorContainer from './vendor/VendorContainer';

class Finance extends Component {
  
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
            <li><NavLink to="/finance/vendor" activeClassName="active-link">Vendor</NavLink></li>
            <li><NavLink to="/finance/po" activeClassName="active-link">PO</NavLink></li>
            <li><NavLink to="/finance/data" activeClassName="active-link">Data</NavLink></li>
          </ul>
        </div>

        <Switch>
          <Route path="/finance/vendor" component={VendorContainer}/>
          <Route path="/finance/po" component={POContainer}/>
          <Route path="/finance/data" component={DataContainer}/>
        </Switch>

      </div>
    </Router>

    );
  }
}

export default Finance;
