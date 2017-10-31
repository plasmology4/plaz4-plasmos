import React from 'react';
import PropTypes from 'prop-types';
import OrgDeptList from './OrgDeptList';

const OrgEdit = React.createClass ( {
  
  propTypes : {
    org: PropTypes.object,
    saveOrg: PropTypes.func.isRequired,
    deleteOrg: PropTypes.func.isRequired,
    orgChange: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired
  },

  render() {
    return (

    <div>

      <div className="p4-toolbar">
        <div className="grid-x grid-padding-x grid-margin-x">
          <div className="auto cell">
            
          </div>
          <div className="small-6 medium-6 large-3 cell ">
            <input className="button small p4-button right" type="button" value="Cancel" onClick={this.props.cancelEdit}/>
            <input className="button small p4-button right" type="button" value="Save" onClick={() => this.props.saveOrg(this.props.org)}/>
            <input className="button small p4-button right" type="button" value="Delete" onClick={() => this.props.deleteOrg(this.props.org)}/>
          </div>
        </div>
      </div>

      <div className="grid-x grid-padding-x form-box">
        <div className="small-12 medium-12 large-12 cell">
          <h4>Organization Info</h4>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="org-name">Org Name</label>
          <input type="text" id="org-name" name="name" placeholder="Org Name" onChange={this.props.orgChange} value={this.props.org.name}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="org-name">Org Id</label>
          <input type="text" id="org-id" name="orgId" placeholder="Org ID" onChange={this.props.orgChange} value={this.props.org.orgId}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" placeholder="Website" onChange={this.props.orgChange} value={this.props.org.website}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="logoUrl">Logo URL</label>
          <input type="text" id="logoUrl" name="logoUrl" placeholder="Logo URL" onChange={this.props.orgChange} value={this.props.org.logoUrl}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="info">Info</label>
          <input type="text" id="info" name="info" placeholder="Info" onChange={this.props.orgChange} value={this.props.org.info}/>
        </div>
        <div className="small-12 medium-12 large-12 cell">
          
        </div>
      </div>

      <div className="grid-x grid-padding-x form-box">
        <div className="small-10 medium-10 large-10 cell">
          <h4>Settings</h4>
        </div>
        <div className="small-2 medium-2 large-2 cell">
          Some Settings Here... 
        </div>
      </div>

      <OrgDeptList depts={this.props.org.departments} addDept={this.props.addDept} deptChange={this.props.deptChange}></OrgDeptList>
      
      <div className="grid-x grid-padding-x form-box">
        <div className="small-10 medium-10 large-10 cell">
          <h4>Admin Users</h4>
        </div>
        <div className="small-2 medium-2 large-2 cell">
          <i className="material-icons right">add_circle_outline</i><i className="material-icons right">remove_circle_outline</i> 
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username"/>
        </div>
        <div className="small-12 medium-6 large-3 cell form-field">
          <label htmlFor="userId">User ID</label>
          <input type="text" id="userId" name="userId" placeholder="id"/>
        </div>
        <div className="small-11 medium-6 large-4 cell form-field">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" placeholder="Description"/>
        </div>
        <div className="small-1 medium-6 large-1 cell form-field">
          <button type="button" className="left remove-button" onClick={() => this.props.removeDept(this.props.dept)}><i className="material-icons">remove_circle_outline</i></button>
        </div>
      </div>
      
      <div className="grid-x grid-padding-x form-box">
        <div className="small-12 medium-12 large-12 cell">
          <h4>Applications</h4>
        </div>
        <div className="small-6 medium-6 large-4 cell form-field">
          <input type="checkbox" id="news" name="news" placeholder=""/>
          <label htmlFor="news">News</label>
        </div>
        <div className="small-6 medium-6 large-4 cell form-field">
          <input type="checkbox" id="qms" name="qms" placeholder=""/>
          <label htmlFor="dept">Quality Management System</label>
        </div>
        <div className="small-6 medium-6 large-4 cell form-field">
          <input type="checkbox" id="binders" name="binders" placeholder=""/>
          <label htmlFor="binders">Document Binders</label>
        </div>
        <div className="small-6 medium-6 large-4 cell form-field">
          <input type="checkbox" id="inventory" name="inventory" placeholder=""/>
          <label htmlFor="inventory">Inventory Manager</label>
        </div>
        <div className="small-6 medium-6 large-4 cell form-field">
          <input type="checkbox" id="vendor-mgr" name="vendor-mgr" placeholder=""/>
          <label htmlFor="vendor-mgr">Vendor Manager</label>
        </div>

      </div>
    </div>

    )
  }

});

export default OrgEdit;