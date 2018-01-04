
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import InformationTechnology from './InformationTechnology';
import HumanResources from './HumanResources';
import ProductDevelopment from './ProductDevelopment';
import QualityRegulatory from './QualityRegulatory';

class Departments extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isBusy: false, hasErrored: false, message: '', news:[] };
  }

  componentDidMount() {
    console.log("componentDidMount state: "+JSON.stringify(this.props));
  }

  render() {

    return (
      <Router>
      <div>
      
        <div className="p4-menu-centered">
          <ul className="menu">
            <li><NavLink to="/departments/hr" activeClassName="active-link">HR</NavLink></li>
            <li><NavLink to="/departments/it" activeClassName="active-link">IT</NavLink></li>
            <li><NavLink to="/departments/prod-dev" activeClassName="active-link">Operations</NavLink></li>
            <li><NavLink to="/departments/prod-dev" activeClassName="active-link">Product Development</NavLink></li>
            <li><NavLink to="/departments/quality-reg" activeClassName="active-link">Quality & Regulatory</NavLink></li>
            <li><NavLink to="/departments/rnd" activeClassName="active-link">R & D</NavLink></li>
          </ul>

        </div>

        <Switch>
          <Route path="/departments/it" component={InformationTechnology}/>
          <Route path="/departments/hr" component={HumanResources}/>
          <Route path="/departments/prod-dev" component={ProductDevelopment}/>
          <Route path="/departments/quality-reg" component={QualityRegulatory}/>
          <Route path="/departments/rnd" component={QualityRegulatory}/>
        </Switch>


      </div>
    </Router>


    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps: "+JSON.stringify(state)); // state
  console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
    news: state.news
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);

