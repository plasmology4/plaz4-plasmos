import React, { Component } from 'react';
import DocsList from './DocsList';

class ProductDevelopment extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      <div>
        <h1 className="main-heading">ProductDevelopment</h1>

        <div className="row">
          <div className="grid-x grid-padding-x grid-margin-x">

            <div className="small-12 medium-10 large-10 cell">
              <DocsList tags='prod-dev'/>
              <div className="main-heading-inv"> FAQ / Help </div>
              <div className="plaz4-tool-callout">
                

              </div>
            </div>
          
            <div className="small-12 medium-2 large-2 cell">
              <div className="main-heading-inv"> Tools </div>
              <div className="plaz4-tool-callout">
                <a href="https://login.microsoftonline.com" className="plaz4-tool-button" target="_new">Office 365</a>
                <a href="http://www.box.com" className="plaz4-tool-button" target="_new">Box</a>
                <a href="https://www.onehub.com" className="plaz4-tool-button" target="_new">OneHub</a>
                <a href="http://www.netsuite.com" className="plaz4-tool-button" target="_new">NetSuite</a>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDevelopment;
