import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserInfoPanel from './UserInfoPanel'

class Info extends Component {
  
  constructor(props) {
    super(props);
    this.state = {value: '', user: null };
  }

  render() {

    return (
      
      <div>
        <br/>
        <h4>Info</h4>
        <br/>
        <UserInfoPanel user={this.props.user}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Info);
