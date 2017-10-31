import React from 'react';

class UserToolbar extends React.Component {
  
  render() {

    return (
      <div className="p4-toolbar">
        <div className="grid-x grid-padding-x grid-margin-x">
          <div className="auto cell">
            
          </div>
          <div className="small-6 medium-6 large-3 cell ">
            
            <button type="button" className="button small p4-button right" onClick={this.props.newUser}>New</button>
            <button type="button" className="button small p4-button right" onClick={this.props.displayList}>List</button>
            <button type="button" className="button small p4-button right" onClick={this.props.refreshList}>Refresh</button>
            <button type="button" className="button small p4-button right" onClick={this.props.showFilterToggle}>Filter</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserToolbar;