import React, { Component } from 'react';
import DocsList from './DocsList';

class HumanResources extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {

    return (
      
      
      <div>
        <h1 className="main-heading">Human Resources</h1>

        <div className="row">
          <div className="grid-x grid-padding-x grid-margin-x">
            <div className="small-12 medium-10 large-10 cell">
              <DocsList tags='hr'/>
              <div className="main-heading-inv"> FAQ / Help </div>
              <div className="plaz4-tool-callout">
                

              </div>
            </div>

            <div className="small-12 medium-2 large-2 cell">
              <div className="main-heading-inv"> Tools </div>
              <div className="plaz4-tool-callout">
                <a href="http://www.paycom.com/" className="plaz4-tool-button" target="_new">Paycom</a>
                <a href="http://hrpro.biz/participant-resources/login" className="plaz4-tool-button" target="_new">HR Pro HSA</a>
                <a href="https://emihealth.com/" className="plaz4-tool-button" target="_new">EMI Health</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default HumanResources;
