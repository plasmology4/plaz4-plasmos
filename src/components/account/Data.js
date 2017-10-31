import React, { Component } from 'react'
import { connect } from 'react-redux'

class Data extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: '', user: null };
  }

  render() {

    return (
      
      <div>
        <div className="grid-container fluid">
          <div className="grid-x">
            <div className="small-12 medium-6 large-4 cell">
            
            </div>
            <div className="small-12 medium-6 large-4 cell">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("Info.mapStateToProps: "+JSON.stringify(state)); // state
  //console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
      user: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps"); // state
  return {
      //doSignOut: () => dispatch(executeSignOutRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
