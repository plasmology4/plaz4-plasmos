import React, { Component } from 'react'
import { connect } from 'react-redux'
import { executeQboAuthRequest, revokeAccessToken, getCompanyInfo, checkAccessToken } from '../../../actions/qbo';
import { moment } from 'moment'

class QboConfig extends Component {
  
  constructor(props) {
    super(props);
    this.authorize = this.authorize.bind(this);
    this.revoke = this.revoke.bind(this);
    this.renew = this.renew.bind(this);
    this.test = this.test.bind(this);
  }

  authorize() {
    console.log("QboConfig.authorize");
    this.props.authorize();
  }

  revoke() {
    console.log("QboConfig.revoke");
    this.props.revoke();
  }
  
  test() {
    console.log("QboConfig.test");
    this.props.getCompanyInfo();
  }
  
  renew() {
    console.log("QboConfig.renew");
    this.props.checkAccessToken();
  }

  render() {

    console.log("RENDERING: "+JSON.stringify(this.props.qboAuth));

    var authorized = (this.props.qboAuth)? this.props.qboAuth.authorized : 'false';
    var refreshToken = (this.props.qboAuth)? this.props.qboAuth.refreshToken : 'None';
    var accessToken = (this.props.qboAuth)? this.props.qboAuth.accessToken : 'None';
    var accessExpirationDate = (this.props.qboAuth)?  this.props.qboAuth.accessExpirationDate : '';
    var refreshExpirationDate = (this.props.qboAuth)? this.props.qboAuth.refreshExpirationDate : '';
    var message = (this.props.qboAuth)? this.props.qboAuth.message : '';

    return (
    
      <div className="grid-x grid-padding-x grid-item-box">
        <div className="small-8 medium-8 large-8 cell"><h4>QBO API Authorization</h4></div>
        <div className="small-4 medium-4 large-4 cell right">{authorized}</div>
        <div className="small-12 medium-12 large-12 cell detail-text left">Use the button to connect your account to QuickBooks Online.  This allows for the exchange, and update, of data in your QBO account using the offical Intuit QuickBooks API. <br/></div>
        <div className="small-12 medium-6 large-6 cell">
          <button type="button" className="c2qb-button small p4-button left" onClick={this.authorize}></button>
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
  console.log("QboConfig.mapStateToProps: "+JSON.stringify(state)); // state
  return {
      qboAuth: state.qboAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("QboConfig.mapDispatchToProps"); // state
  return {
      authorize: () => dispatch(executeQboAuthRequest()),
      revoke: () => dispatch(revokeAccessToken()),
      checkAccessToken: () => dispatch(checkAccessToken()),
      getCompanyInfo: () => dispatch(getCompanyInfo())

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QboConfig);
