import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import Invoices from './billing/Invoices';
import Payments from './billing/Payments';
import { getBillingData } from '../services/billing';


class Billing extends Component {
  
  constructor() {
    super()
    this.state = { jokes: [] };
  }

  getFoodJokes() {
    getBillingData().then((jokes) => {
      this.setState({ jokes });
    });
  }

  componentDidMount() {
    this.getFoodJokes();
  }

  render() {

    const { jokes }  = this.state;

    return (
      <Router>
      <div>
      
        <div className="p4-menu-centered">
          <ul className="menu">
            <li><NavLink to="/billing/invoices" activeClassName="active-link">Invoices</NavLink></li>
            <li><NavLink to="/billing/payments" activeClassName="active-link">Payments</NavLink></li>
          </ul>

        </div>

        <Switch>
          <Route path="/billing/invoices" component={Invoices}/>
          <Route path="/billing/payments" component={Payments}/>
        </Switch>

        { jokes.map((joke, index) => (
              <div className="col-sm-6" key={index}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">#{ joke.id }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> { joke.joke } </p>
                  </div>
                </div>
              </div>
          ))}


      </div>
    </Router>


    );
  }
}

export default Billing;
