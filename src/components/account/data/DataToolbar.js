import React from 'react';

class DataToolbar extends React.Component {
  
  render() {

    return (
      <div className="p4-toolbar">
        <div className="grid-x grid-padding-x grid-margin-x">
          <div className="small-6 medium-6 large-3 cell">
            
              <select className='data-table' onChange={this.props.dataTypeChange}>
                <option value="coa">Chart Of Accounts</option>
                <option value="account-types">Account Types</option>
                <option value="journal-entries">Journal Entries</option>
              </select>
          </div>
          <div className="auto cell">
          </div>
          <div className="small-6 medium-6 large-3 cell ">
            
            <button type="button" className="button small p4-button right" onClick={this.props.syncData}>Synchronize All</button>
            <button type="button" className="button small p4-button right" onClick={this.props.refreshList}>Refresh</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DataToolbar;