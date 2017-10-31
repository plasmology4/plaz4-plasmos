import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import OrgContainer from './org/OrgContainer';
import UserContainer from './user/UserContainer';

const Control = props => {
  return (

    <Router>
      <div>
        <div className="p4-menu-centered">
          <ul className="menu">
            <li><NavLink to="/control/orgs" activeClassName="active-link">Organizations</NavLink></li>
            <li><NavLink to="/control/users" activeClassName="active-link">Users</NavLink></li>
          </ul>
        </div>

        <Switch>
          <ProtectedRoute path="/control/orgs" component={OrgContainer}/>
          <ProtectedRoute path="/control/users" component={UserContainer}/>
        </Switch>

      </div>
    </Router>   
    
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("Control.mapStateToProps: "+JSON.stringify(state)); // state
  return {};
};

const mapDispatchToProps = (dispatch) => {
  console.log("Control.mapDispatchToProps"); // state
  return {
      //getOrgs: () => dispatch(getOrganizations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
