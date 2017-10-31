import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { executeLoginRequest, executeSignOutRequest } from '../actions/session'

class Login extends Component {
  
  componentDidMount() {
    //this.props.fetchData(this.state.username, this.state.password);
  }
  
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.loginClicked = this.loginClicked.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  loginClicked(event) {
    console.log('1');
    console.log('Login was clicked: ' + this.state);
    this.props.doLogin(this.state.username, this.state.password);
    event.preventDefault();
  }

  handleUserChange(event) {
    console.log('setting username: '+event.target.value);
    this.setState({username : event.target.value});
    console.log('State: ' + JSON.stringify(this.state));
  }
  
  handlePasswordChange(event) {
    console.log('setting password: '+event.target.value);
    this.setState({password : event.target.value});
    console.log('State: ' + JSON.stringify(this.state));
  }

  render() {

    if (!this.props.session) {
      if (this.props.hasErrored) {
        return (<p> there was an error </p>);
      } else {
        return (
          <div>
            <div className="p4-menu-centered">
                <ul className="menu">
                  <li><NavLink to="/" activeClassName="active-link">HARNESSING THE 4TH STATE OF MATTER</NavLink></li>
              </ul>
            </div>


            <div className="grid-x grid-padding-x grid-margin-x">
              
              <div className="cell auto"></div>
              <div className="cell small-6 medium-6 large-5 callout p4-callout"> 

                  <div className="grid-x grid-padding-x grid-margin-x">

                    <div className="small-12 medium-12 large-12 cell">
                      <h4>Enter Login Credentials</h4>
                    </div>

                    <div className="small-12 medium-12 large-12 cell form-field">
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" id="username" value={this.state.username} placeholder="Username" onChange={this.handleUserChange}/>
                    </div>

                    <div className="small-12 medium-12 large-12 cell form-field">
                      <label htmlFor="password" >Password</label>
                      <input type="password" className="form-control" id="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange}/>
                    </div>

                    <div className="small-12 medium-12 large-12 cell">
                      <button type="button" className="button small p4-button right" onClick={this.loginClicked}>Login</button>
                    </div>

                    <div className="small-6 medium-6 large-6 cell text-left">
                      <a href="/signup">Forgot username/password &#10095;</a>
                    </div>

                    <div className="small-6 medium-6 large-6 cell text-right">
                      <a href="/signup">Not Enrolled? Signup &#10095;</a>
                    </div>

                  </div>

              </div>
              <div className="cell auto"></div>

            </div> 
          </div>
        )
      }
    } else {
      return (
        <div>
          <div className="p4-menu-centered">
              <ul className="menu">
                <li><NavLink to="/" activeClassName="active-link">HARNESSING THE 4TH STATE OF MATTER</NavLink></li>
            </ul>
          </div>

          <div className="row">

          
          </div>

        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps: "+JSON.stringify(state)); // state
  //console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
      session: state.session,
      //isAdmin: state.userIsAdmin,
      hasErrored: state.loginHasErrored,
      isPending: state.loginIsPending
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
      doLogin: (username, password) => dispatch(executeLoginRequest(username, password)), 
      doSignOut: () => dispatch(executeSignOutRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);