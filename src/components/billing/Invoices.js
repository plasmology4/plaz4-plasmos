import React, { Component } from 'react';

class Invoices extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <div>
        <h1 className="main-heading">Invoices</h1>
      </div>
    );
  }
}

export default Invoices;
