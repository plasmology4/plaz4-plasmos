import React from 'react';
import FinancialPeriod from '../data/FinancialPeriod'

const VendorToolbar = (props) => {

  var actionControls = null;
  if (props.dataType === 'coa') {
    actionControls = (
      <div className="small-6 medium-6 large-6 cell ">
        <button type="button" className="button small p4-button right" onClick={props.syncAll}>Synchronize All</button>
        <button type="button" className="button small p4-button right" onClick={props.refreshList}>Refresh</button>
        <button type="button" className="button small p4-button right" onClick={props.createAccountStructure}>Create Types</button>
        <button type="button" className="button small p4-button right" onClick={props.deleteAllAccounts}>Delete All</button>
      </div>  
    );
  } else if (props.dataType === 'account-types') {
    actionControls = (
      <div className="small-6 medium-6 large-6 cell ">
        <button type="button" className="button small p4-button right" onClick={props.refreshList}>Refresh</button>
      </div>
    );

  } else if (props.dataType === 'journal-entries') {
    actionControls = (
      <div className="small-6 medium-6 large-6 cell ">
        <button type="button" className="button small p4-button right" onClick={props.refreshList}>Refresh</button>
        <button type="button" className="button small p4-button right" onClick={props.uploadPeriod}>Upload Period</button>
        <FinancialPeriod className="right" periodChange={props.periodChange} financialPeriod={props.financialPeriod} />
      </div>
    );
  } else if (props.dataType === 'ap-invoices') {
    actionControls = (
      <div className="small-6 medium-6 large-6 cell ">
        <button type="button" className="button small p4-button right" onClick={props.refreshList}>Refresh</button>
        <button type="button" className="button small p4-button right" onClick={props.uploadApInvoices}>Upload All Invoices</button>
        <button type="button" className="button small p4-button right" onClick={props.deleteApInvoices}>Delete All Invoices</button>
      </div>
    );
  } else {
    actionControls = (
      <div className="small-6 medium-6 large-6 cell ">
        <button type="button" className="button small p4-button right" onClick={props.createNew}>New Vendor</button>
        <button type="button" className="button small p4-button right" onClick={props.refreshList}>Refresh</button>
      </div>
    );
 }

  return (
    <div className="p4-toolbar">
      <div className="grid-x grid-padding-x grid-margin-x">
        <div className="small-6 medium-6 large-3 cell">
          
            <select className='plaz4-tool-select data-table' onChange={props.dataTypeChange}>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="in-process">In Process</option>
            </select>
        </div>
        <div className="auto cell">
        </div>
        {actionControls}
      </div>
    </div>
  );

}

export default VendorToolbar;