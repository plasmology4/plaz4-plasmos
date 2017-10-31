import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class ProtectedRoute extends Component {
  
  render() {
    
    if (this.props.session) {
      return <Route {...this.props}/>
    } else {
      return <Redirect to='/login' from={this.props.path}/>
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("ProtectedRoute.mapStateToProps: "+JSON.stringify(state)); // state
  console.log("ownProps: "+JSON.stringify(ownProps)); // ownProps
  return {
      session: state.session,
      path: ownProps.path
  };
};

export default connect(mapStateToProps)(ProtectedRoute);