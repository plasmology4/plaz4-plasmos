import React from 'react';
import { connect } from 'react-redux';

const Loader = props => {

  return (
    <div className="loader-box" style={props.style}>
      <div className="loader"></div>    
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("Loader.mapStateToProps: "+JSON.stringify(state)); // state
  var style = (state.isBusy)? {} : {display:'none'} ;
  return {
    style: style
  };
};

export default connect(mapStateToProps)(Loader);
