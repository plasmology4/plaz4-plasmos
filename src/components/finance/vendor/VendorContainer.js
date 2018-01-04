import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import VendorToolbar from './VendorToolbar';
import DataList from './DataList';

class VendorContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log("VendorContainer.constructor");
    
    this.state = {
    };
  }

  componentDidMount() {
    console.log("VendorContainer.componentDidMount");
  }
  
  render() {
    return (
        <VendorToolbar refreshList={this.refreshData}/>
      );
  } 
}

const mapStateToProps = (state, ownProps) => {
  console.debug("VendorContainer.state.qboAuth: "+JSON.stringify(state.qboAuth));

  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("VendorContainer.mapDispatchToProps"); // state
  return {
  };
};

VendorContainer.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(VendorContainer);
