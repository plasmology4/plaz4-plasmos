import React, { Component } from 'react';

class UserInfoPanel extends Component {

  render() {

    var firstname = '';
    var lastname = '';
    var email = '';

    if (this.props.user) {
      firstname = this.props.user.firstname;
      lastname = this.props.user.lastname;
      email = this.props.user.email;
    }

    return (
      
      <div>
        <br/>
        <h4>UserInfoPanel</h4>
        <br/>
        <span>Firstname: {firstname} </span>
        <br/>
        <span>Lastname: {lastname} </span>
        <br/>
        <span>Email: {email} </span>

      </div>
    );
  }
}

export default UserInfoPanel;
