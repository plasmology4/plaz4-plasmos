import React, { Component } from 'react';

class Order extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <div>
        <h1 className="main-heading">Order Inventory</h1>
      </div>
    );
  }
}

export default Order;
