import React, { Component } from 'react'
import { connect } from 'react-redux'
import { executeQboAuthRequest } from '../../../actions/qbo/qbo';

class NetSuiteConfig extends Component {
  
  constructor(props) {
    super(props);
    this.authorize = this.authorize.bind(this);
  }

  authorize() {
    console.log("NetSuiteConfig.authorize");
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

    console.log("RENDERING: "+JSON.stringify(this.props.netsuiteAuth));

    var authorized = (this.props.netsuiteAuth)? this.props.netsuiteAuth.authorized : 'false';
    var refreshToken = (this.props.netsuiteAuth)? this.props.netsuiteAuth.refreshToken : 'None';
    var accessToken = (this.props.netsuiteAuth)? this.props.netsuiteAuth.accessToken : 'None';
    var accessExpirationDate = (this.props.netsuiteAuth)? this.props.netsuiteAuth.accessExpirationDate : '';
    var refreshExpirationDate = (this.props.netsuiteAuth)? this.props.netsuiteAuth.refreshExpirationDate : '';
    var message = (this.props.netsuiteAuth)? this.props.netsuiteAuth.message : '';

    return (
    
      <div className="grid-x grid-padding-x grid-item-box">
        <div className="small-8 medium-8 large-8 cell"><h4>NetSuite API Authorization</h4></div>
        <div className="small-4 medium-4 large-4 cell right">{authorized}</div>
        <div className="small-12 medium-12 large-12 cell detail-text left">Use the button to connect your account to NetSuite.  This allows for the exchange, and update, of data in your NetSuite account using the offical NetSuite API. <br/></div>
        <div className="small-12 medium-6 large-6 cell">
          <button type="button" className="c2ns-button small p4-button left" onClick={this.authorize}></button>
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
  console.log("NetSuiteConfig.mapStateToProps: "+JSON.stringify(state)); // state
  return {
      netsuiteAuth: state.netsuiteAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("NetSuiteConfig.mapDispatchToProps"); // state
  return {
      doQboAuth: () => dispatch(executeQboAuthRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetSuiteConfig);
