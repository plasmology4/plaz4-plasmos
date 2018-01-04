import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import LogoImg from '../assets/img/p4-icon-vector.svg'
import { executeSignOutRequest } from '../actions/session'

class Nav extends Component {
  
  componentDidMount() {
    //this.props.fetchData(this.state.username, this.state.password);

    // var element = $(ReactDOM.findDOMNode(this)).dotdotdot();
    // var elem = new Foundation.Sticky(element, options);

  }
  
  constructor(props) {
    super(props);
    // this.state = {username: '', password: ''};

    this.signOutClicked = this.signOutClicked.bind(this);
    // this.handleUserChange = this.handleUserChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  signOutClicked(event) {
    console.log('Sign Out was clicked: ' + this.state);
    this.props.doSignOut();
    event.preventDefault();
  }

  render() {

    const divStyle = { width: '100%' }

    return (
      <div>
        <div className="top-bar" data-sticky data-options="marginTop:0;" style={divStyle} >
                  
          <div className="top-bar-title">
            <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
              <button className="menu-icon light" type="button" data-toggle></button>
            </span>
            <img className="p4-icon" src={LogoImg} alt="logo" />
            <a href="/" className="brand-text">PLASMOSPHERE</a>
          </div>
          
          <div id="responsive-menu">
            <div className="top-bar-right">
              <ul className="menu">
                <li><NavLink to="/" activeClassName="active-link"><i className="material-icons">home</i></NavLink></li>
                
                <li><NavLink to="/company/news" className="fix-lower" activeClassName="active-link">Company</NavLink></li>
                <li><NavLink to="/resources" className="fix-lower" activeClassName="active-link">Departments</NavLink></li>
                {( (session) => { if (session) return ( <li><NavLink to="/inventory" className="fix-lower" activeClassName="active-link">Inventory</NavLink></li> ) })(this.props.session) }
                {( (session) => { if (session) return ( <li><NavLink to="/finance" className="fix-lower" activeClassName="active-link">Finance</NavLink></li> ) })(this.props.session) }
                {( (session) => { if (session) return ( <li><NavLink to="/account" className="fix-lower" activeClassName="active-link">Account</NavLink></li> ) })(this.props.session) }
                
                {( (isAdmin) => { if (isAdmin) return ( <li><NavLink to="/admin" className="fix-lower" activeClassName="active-link">Admin</NavLink></li> ) })(this.props.isAdmin) }
                {( (superAdmin) => { if (superAdmin) return ( <li><NavLink to="/control" className="fix-lower" activeClassName="active-link">Control</NavLink></li> ) })(this.props.superAdmin) }

                {( (session) => { if (!session) return ( <li><NavLink to="/login" className="fix-lower" activeClassName="active-link">Login</NavLink></li> ) })(this.props.session) }
                {( (session) => { if (session) return ( <li><button type="button" className="top-bar-button" onClick={this.signOutClicked}>Sign Out</button></li> ) })(this.props.session) }
                
                
                <li><NavLink to="/help"><i className="material-icons">help</i></NavLink></li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.debug("Nav.mapStateToProps: "+JSON.stringify(state)); // state
  //console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  var superAdmin = false;
  var isAdmin = false;
  var user;
  
  if (state.session) {
    if (state.session.user) {
      user = state.session.user;
      superAdmin = (state.session.user.role === 'SuperAdmin');
      isAdmin = (state.session.user.role === 'Admin');
    }
  }

  return {
      session: state.session,
      user: user,
      superAdmin: superAdmin,
      isAdmin: isAdmin,
      isPending: state.loginIsPending
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
      doSignOut: () => dispatch(executeSignOutRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);