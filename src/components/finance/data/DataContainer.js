import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { executeSyncDataRequest, showSyncStatus, executeSyncAll, getParentData, createAccountStructure, deleteAllAccounts} from '../../../actions/qbo/coa'
import { uploadJournalEntriesToQbo, syncJournalEntry } from '../../../actions/qbo/journal-entries'
import { uploadApInvoicesToQbo, deleteApInvoicesFromQbo } from '../../../actions/qbo/ap'
import { getData } from '../../../actions/accounting'

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
      , financialPeriod: {year: 2013, period: 1 }
    };

    this.refreshData = this.refreshData.bind(this);
    this.dataTypeChange = this.dataTypeChange.bind(this);
    this.syncAll = this.syncAll.bind(this);
    this.syncData = this.syncData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.showSyncStatus = this.showSyncStatus.bind(this);
    this.createAccountStructure = this.createAccountStructure.bind(this);
    this.deleteAllAccounts = this.deleteAllAccounts.bind(this);
    this.uploadPeriod = this.uploadPeriod.bind(this);
    this.uploadApInvoices = this.uploadApInvoices.bind(this);
    this.deleteApInvoices = this.deleteApInvoices.bind(this);
    this.periodChange = this.periodChange.bind(this);
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

  periodChange(event) {
    console.log("periodChange");
    const field = event.target.name;
    const value = event.target.value;
    console.log("field: "+field);
    console.log("value: "+value);
    var financialPeriod = this.state.financialPeriod;
    
    financialPeriod[field] = value;
    console.log("financialPeriod: "+JSON.stringify(financialPeriod));
    return this.setState({financialPeriod: financialPeriod});
  }

  refreshData() {
    console.log("refreshData()");
    this.props.getData(this.state.dataType);
  }

  uploadPeriod() {
    console.log("uploadPeriod(): "+JSON.stringify(this.state.financialPeriod));
    uploadJournalEntriesToQbo(this.state.financialPeriod, this.props.qboAuth);
  }

  uploadApInvoices() {
    console.log("uploadApInvoices()");
    uploadApInvoicesToQbo(null, this.props.qboAuth);
  }
  deleteApInvoices() {
    console.log("deleteApInvoices()");
    deleteApInvoicesFromQbo(null, this.props.qboAuth);
  }
  
  syncAll() {
    console.log("syncAll()");
    this.props.syncAll(this.state.dataType, this.props.qboAuth);
  }

  syncData(item) {
    console.log("syncData()");
    if (this.state.dataType === 'coa') {
      executeSyncDataRequest(item, this.props.qboAuth);
    } else if  (this.state.dataType === 'journal-entries') {
      syncJournalEntry(item, this.props.qboAuth);
    } else if  (this.state.dataType === 'ap-invoices') {
      uploadApInvoicesToQbo(item, this.props.qboAuth);
    } 
  }

  deleteData(item) {
    console.log("deleteData()");
    if  (this.state.dataType === 'ap-invoices') {
      deleteApInvoicesFromQbo(item, this.props.qboAuth);
    } 
  }

  showSyncStatus(item) {
    console.log("syncData()");
    showSyncStatus(item, this.props.qboAuth);
  }

  createAccountStructure() {
    this.props.createAccountStructure(this.props.qboAuth);
  }

  deleteAllAccounts() {
    this.props.deleteAllAccounts(this.props.qboAuth);
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
          <DataToolbar refreshList={this.refreshData} 
                        syncAll={this.syncAll} 
                        dataType={this.state.dataType} 
                        dataTypeChange={this.dataTypeChange} 
                        periodChange={this.periodChange} 
                        uploadPeriod={this.uploadPeriod} 
                        uploadApInvoices={this.uploadApInvoices} 
                        deleteApInvoices={this.deleteApInvoices} 
                        financialPeriod={this.state.financialPeriod} 
                        deleteAllAccounts={this.deleteAllAccounts}
                        createAccountStructure={this.createAccountStructure}
                        />
          <DataList items={this.props.items} 
                    syncData={this.syncData} 
                    deleteData={this.deleteData} 
                    dataType={this.state.dataType}
                    showSyncStatus={this.showSyncStatus}/>
        </div>
      );
    } 
  }
};

const mapStateToProps = (state, ownProps) => {
  // console.log("DataContainer.mapStateToProps: "+JSON.stringify(state)); // state
  // console.log("DataContainer.ownProps: "+JSON.stringify(ownProps)); // ownProps
  // console.log("DataContainer.state.items: "+JSON.stringify(state.items));
  console.debug("DataContainer.state.qboAuth: "+JSON.stringify(state.qboAuth));

  return {
    items: state.accounts
    , qboAuth: state.qboAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("DataContainer.mapDispatchToProps"); // state
  return {
    createAccountStructure: (qboAuth) => createAccountStructure(qboAuth)
    , deleteAllAccounts: (qboAuth) => deleteAllAccounts(qboAuth)
    , getData: (type) => dispatch(getData(type))
    , syncAll: (type, qboAuth) => executeSyncAll(type, qboAuth)
//    , syncData: (data, qboAuth) => executeSyncDataRequest(data, qboAuth)
//    , showSyncStatus: (data, qboAuth) => showSyncStatus(data, qboAuth)
  };
};

DataContainer.propTypes = {
  getData: PropTypes.func,
  syncAll: PropTypes.func,
  saveOrg: PropTypes.func,
  deleteOrg: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);
