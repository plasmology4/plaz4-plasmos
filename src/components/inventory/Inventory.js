import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import Current from './inventory/Current';
import Consume from './inventory/Consume';
import Reconcile from './inventory/Reconcile';
import Order from './inventory/Order';

class Inventory extends Component {
  render() {

    return (

  		<Router>
        <div>
    			<div className="p4-menu-centered">
    			  <ul className="menu">
    			    <li><NavLink to="/inventory/current" activeClassName="active-link">Current</NavLink></li>
              <li><NavLink to="/inventory/consume" activeClassName="active-link">Consume</NavLink></li>
              <li><NavLink to="/inventory/reconcile" activeClassName="active-link">Reconcile</NavLink></li>
              <li><NavLink to="/inventory/order" activeClassName="active-link">Order</NavLink></li>
    			  </ul>
    			</div>

          <Switch>
            <ProtectedRoute path="/inventory/current" component={Current}/>
            <ProtectedRoute path="/inventory/consume" component={Consume}/>
            <ProtectedRoute path="/inventory/reconcile" component={Reconcile}/>
            <ProtectedRoute path="/inventory/order" component={Order}/>
          </Switch>

        </div>
  		</Router>   
      
    );
  }
}

export default Inventory;
