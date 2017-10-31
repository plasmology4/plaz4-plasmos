import React, { Component } from 'react';

class AdminSettings extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <div>
        <h1 className="main-heading">Settings</h1>
      </div>
    );
  }
}

export default AdminSettings;
