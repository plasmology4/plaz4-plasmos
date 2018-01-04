import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import POToolbar from './POToolbar';
import DataList from './DataList';

class POContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log("POContainer.constructor");
    
    this.state = {
    };
  }

  componentDidMount() {
    console.log("POContainer.componentDidMount");
  }
  
  render() {
    return (
        <POToolbar refreshList={this.refreshData}/>
      );
  } 
}

const mapStateToProps = (state, ownProps) => {
  console.debug("POContainer.state.qboAuth: "+JSON.stringify(state.qboAuth));

  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("POContainer.mapDispatchToProps"); // state
  return {
  };
};

POContainer.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(POContainer);
