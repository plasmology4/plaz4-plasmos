import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute'
import AdminUsers from './AdminUsers';
import EditUser from './EditUser';
import AdminCustomers from './AdminCustomers';
import AdminSettings from './AdminSettings';

class Admin extends Component {
  render() {

    return (

      <Router>
        <div>
          <div className="p4-menu-centered">
            <ul className="menu">
              <li><NavLink to="/admin/users" activeClassName="active-link">Users</NavLink></li>
              <li><NavLink to="/admin/customers" activeClassName="active-link">Customers</NavLink></li>
              <li><NavLink to="/admin/settings" activeClassName="active-link">AdminSettings</NavLink></li>
            </ul>
          </div>

          <Switch>
            <ProtectedRoute path="/admin/users/:id" component={EditUser}/>
            <ProtectedRoute path="/admin/users" component={AdminUsers}/>
            <ProtectedRoute path="/admin/customers" component={AdminCustomers}/>
            <ProtectedRoute path="/admin/settings" component={AdminSettings}/>
          </Switch>

        </div>
      </Router>   
      
    );
  }
}

export default Admin;