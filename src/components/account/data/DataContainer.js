import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getData, executeSyncDataRequest, showSyncStatus } from '../../../actions/acct'

import DataToolbar from './DataToolbar'
import DataList from './DataList'
import DataEdit from './DataEdit'

class DataContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log("DataContainer.constructor");
    
    this.state = {
      editingData: null
      , isEditing: false
      , dataType: 'coa'
    };

    this.refreshData = this.refreshData.bind(this);
    this.dataTypeChange = this.dataTypeChange.bind(this);
    //this.getData = this.getData.bind(this);


  }

  componentDidMount() {
    console.log("DataContainer.componentDidMount");
    this.props.getData(this.state.dataType);
  }

  // Called when the select is changed to a different data type on the toolbar
  dataTypeChange(event) {
    console.log("dataTypeChange");
    const field = event.target.name;
    const value = event.target.value;
    console.log("field: "+field);
    console.log("value: "+value);
    this.state.dataType = value;
    this.props.getData(value);
    return;
  }

  refreshData() {
    console.log("refreshData()");
    this.props.getData(this.state.dataType);
  }
  
  render() {

    if (this.state.isEditing) {
      return (
        <div>
          <DataEdit org={this.state.editingData} 
                    saveData={this.props.saveData} 
                    deleteData={this.props.deleteData} 
                    cancelEdit={this.cancelEdit} 
                    orgChange={this.updateDataState} 
                    addDept={this.addDept}
                    deptChange={this.updateDeptState}/>
        </div>
      );
    } 
    else {
      return (
        <div>
          <DataToolbar refreshList={this.props.getData} dataTypeChange={this.dataTypeChange}/>
          <DataList items={this.props.items} 
                    syncData={this.props.syncData} 
                    dataType={this.state.dataType}
                    showSyncStatus={this.props.showSyncStatus}/>
        </div>
      );
    } 
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log("DataContainer.mapStateToProps: "+JSON.stringify(state)); // state
  console.log("DataContainer.ownProps: "+JSON.stringify(ownProps)); // ownProps
  console.log("DataContainer.state.items: "+JSON.stringify(state.items));

  return {
    items: state.accounts
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("DataContainer.mapDispatchToProps"); // state
  return {
    getData: (type) => dispatch(getData(type)),
    syncData: (data) => dispatch(executeSyncDataRequest(data)),
    showSyncStatus: (data) => dispatch(showSyncStatus(data))
  };
};

DataContainer.propTypes = {
  getData: PropTypes.func,
  saveOrg: PropTypes.func,
  deleteOrg: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);
