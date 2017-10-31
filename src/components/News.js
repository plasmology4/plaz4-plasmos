
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import PlasmaScienceNews from './news/PlasmaScienceNews';
import CompanyNews from './news/CompanyNews';
import NewsList from './news/NewsList'

class News extends Component {
  
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
              <li><NavLink to="/news/plaz4" activeClassName="active-link">Company</NavLink></li>
              <li><NavLink to="/news/plasma-science" activeClassName="active-link">Plasma Science</NavLink></li>
            </ul>

          </div>

          <Switch>
            <Route path="/news/plaz4" component={CompanyNews}/>
            <Route path="/news/plasma-science" component={PlasmaScienceNews}/>
          </Switch>

          <div className="row">
            <div className="small-12 columns">
              <br/>
            </div>
          </div>

          
          <div className="row">
            <div className="grid-x grid-padding-x grid-margin-x">
              <div className="small-12 medium-8 large-8 cell">
                <NewsList/>
              </div>
            </div>
          </div>
          


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

export default connect(mapStateToProps, mapDispatchToProps)(News);

