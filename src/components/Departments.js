
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import InformationTechnology from './resources/InformationTechnology';
import HumanResources from './resources/HumanResources';
import ProductDevelopment from './resources/ProductDevelopment';
import QualityRegulatory from './resources/QualityRegulatory';

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
            <li><NavLink to="/resources/it" activeClassName="active-link">Information Technology</NavLink></li>
            <li><NavLink to="/resources/hr" activeClassName="active-link">Human Resources</NavLink></li>
            <li><NavLink to="/resources/prod-dev" activeClassName="active-link">Product Development</NavLink></li>
            <li><NavLink to="/resources/quality-reg" activeClassName="active-link">Quality Regulatory</NavLink></li>
          </ul>

        </div>

        <Switch>
          <Route path="/resources/it" component={InformationTechnology}/>
          <Route path="/resources/hr" component={HumanResources}/>
          <Route path="/resources/prod-dev" component={ProductDevelopment}/>
          <Route path="/resources/quality-reg" component={QualityRegulatory}/>
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

