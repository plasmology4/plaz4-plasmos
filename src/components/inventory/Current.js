import React, { Component } from 'react';

class Current extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <div>
        <br/>
        <h1 className="main-heading">Current Inventory</h1>
        <br/>

      </div>
    );
  }
}

export default Current;
