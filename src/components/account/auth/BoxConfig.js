import React, { Component } from 'react'
import { connect } from 'react-redux'
import { executeQboAuthRequest } from '../../../actions/qbo/qbo';

class BoxConfig extends Component {
  
  constructor(props) {
    super(props);
    this.authorize = this.authorize.bind(this);
  }

  authorize() {
    console.log("BoxConfig.authorize");
    this.props.doQboAuth();
  }

  revoke() {
    console.log("QboConfig.revoke");
    //this.props.revoke();
  }
  
  test() {
    console.log("QboConfig.test");
    //this.props.revoke();
  }
  
  renew() {
    console.log("QboConfig.renew");
    this.props.checkAccessToken();
  }

  render() {

    console.log("RENDERING: "+JSON.stringify(this.props.boxAuth));

    var authorized = (this.props.boxAuth)? this.props.boxAuth.authorized : 'false';
    var refreshToken = (this.props.boxAuth)? this.props.boxAuth.refreshToken : 'None';
    var accessToken = (this.props.boxAuth)? this.props.boxAuth.accessToken : 'None';
    var accessExpirationDate = (this.props.boxAuth)? this.props.boxAuth.accessExpirationDate : '';
    var refreshExpirationDate = (this.props.boxAuth)? this.props.boxAuth.refreshExpirationDate : '';
    var message = (this.props.boxAuth)? this.props.boxAuth.message : '';

    return (
    
      <div className="grid-x grid-padding-x grid-item-box">
        <div className="small-8 medium-8 large-8 cell"><h4>Box API Authorization</h4></div>
        <div className="small-4 medium-4 large-4 cell right">{authorized}</div>
        <div className="small-12 medium-12 large-12 cell detail-text left">Use the button to connect your account to Box.  This allows for the exchange, and update, of data in your Box account using the offical Box API. <br/></div>
        <div className="small-12 medium-6 large-6 cell">
          <button type="button" className="c2box-button small p4-button left" onClick={this.authorize}></button>
        </div>
        <div className="small-12 medium-6 large-6 cell right">
          <button type="button" className="auth-button small p4-button " onClick={this.renew}><i className="material-icons auth-icon">sync</i></button>
          <button type="button" className="auth-button small p4-button " onClick={this.revoke}><i className="material-icons auth-icon">block</i></button>
          <button type="button" className="auth-button small p4-button " onClick={this.test}><i className="material-icons auth-icon">info</i></button>
        </div>
        <div className="small-12 medium-12 large-12 cell form-field">
          <label htmlFor="access-token">Access Token</label>
          <input type="text" id="access-token" name="accessToken" placeholder="Access Token" value={accessToken}/>
        </div>
        <div className="small-12 medium-12 large-12 cell form-field">
          <label htmlFor="acc-exp-date">Access Token Expiration</label>
          <input type="text" id="acc-exp-date" name="accExpirationDate" placeholder="Access Token Expiration Date" value={accessExpirationDate}/>
        </div>
        <div className="small-12 medium-12 large-12 cell form-field">
          <label htmlFor="refresh-token">Refresh Token</label>
          <input type="text" id="refresh-token" name="refreshToken" placeholder="Refresh Token" value={refreshToken}/>
        </div>
        <div className="small-12 medium-12 large-12 cell form-field">
          <label htmlFor="refr-exp-date">Refresh Token Expiration</label>
          <input type="text" id="refr-exp-date" name="refrExpirationDate" placeholder="Refresh Token Expiration Date" value={refreshExpirationDate}/>
        </div>
        <div className="small-12 medium-12 large-12 cell form-field">
          <label htmlFor="message">Message</label>
          <input type="text" id="message" name="message" placeholder="Message" value={message}/>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("BoxConfig.mapStateToProps: "+JSON.stringify(state)); // state
  return {
      boxAuth: state.boxAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("BoxConfig.mapDispatchToProps"); // state
  return {
      doQboAuth: () => dispatch(executeQboAuthRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxConfig);
