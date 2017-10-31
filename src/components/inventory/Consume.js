import React, { Component } from 'react';

class Consume extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {

    return (
      
      <div>
        <br/>
        <h1 className="main-heading">Report Consumption</h1>
        <br/>

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="small-2 columns">
              <label htmlFor="qty" className="text-right middle">Quantity</label>
            </div>
            <div className="small-2 columns">
              <input type="text" id="qty" placeholder="Qty" value={this.state.value} onChange={this.handleChange}/>
            </div>
            <div className="small-2 columns">
              <label htmlFor="qty" className="text-right middle">Description</label>
            </div>
            <div className="small-2 columns">
              <input type="text" id="desc" placeholder="Desc"/>
            </div>
          </div>
          <div className="row">
            <div className="small-2 columns">
              <label htmlFor="code" className="text-right middle">Reference Code</label>
            </div>
            <div className="small-2 columns">
              <input type="text" id="serial" placeholder="Code"/>
            </div>
            <div className="small-2 columns">
              <label htmlFor="serial" className="text-right middle">Serial Number</label>
            </div>
            <div className="small-2 columns">
              <input type="text" id="code" placeholder="Serial#"/>
            </div>
            <div className="small-1 columns input-group-button">
              <input type="submit" className="button" value="Submit"/>
            </div>
          </div>
        </form>

      </div>
    );
  }
}

export default Consume;
