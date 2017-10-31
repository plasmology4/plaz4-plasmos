import React, { Component } from 'react';

class AdminCustomers extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <div>
        <h1 className="main-heading">Customer Administration</h1>
      </div>
    );
  }
}

export default AdminCustomers;
