import React, { Component } from 'react';

class CompanyNews extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <div>
        <h1 className="main-heading">Company News</h1>
      </div>
    );
  }
}

export default CompanyNews;
