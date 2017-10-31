import React from 'react';
import PropTypes from 'prop-types';
 
const renderOrgOpt = (org, i) => (
  <option key={i} value={org.orgId}>{org.name}</option>
);

const renderOrgOptions = (props) => (
  props.orgs.map((org, i) => renderOrgOpt(org, i))
);

const UserEdit = (props) => {

  var orgOptions = null;
  if (props.orgs) {
    orgOptions = renderOrgOptions(props);
  }

  return (

    <div>

      <div className="p4-toolbar">
        <div className="grid-x grid-padding-x grid-margin-x">
          <div className="auto cell">
            
          </div>
          <div className="small-6 medium-6 large-3 cell ">
            <input className="button small p4-button right" type="button" value="Back" onClick={props.cancelEdit}/>
            <input className="button small p4-button right" type="button" value="Save" onClick={() => props.saveUser(props.user)}/>
            <input className="button small p4-button right" type="button" value="Delete" onClick={() => props.deleteUser(props.user)}/>
          </div>
        </div>
      </div>

      <div className="grid-x grid-padding-x form-box">
        <div className="small-12 medium-12 large-12 cell">
          <h4>User Info</h4>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="firstname">Firstname</label>
          <input type="text" id="firstname" name="firstname" placeholder="Firstname" onChange={props.userChange} value={props.user.firstname}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="lastname">Lastname</label>
          <input type="text" id="lastname" name="lastname" placeholder="Lastname" onChange={props.userChange} value={props.user.lastname}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="id">User Id</label>
          <input type="text" id="id" name="id" placeholder="User ID" onChange={props.userChange} value={props.user.id}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" name="email" placeholder="Email" onChange={props.userChange} value={props.user.email}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" placeholder="Password" onChange={props.userChange} value={props.user.password}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="role">Role</label>
          <input type="text" id="role" name="role" placeholder="Password" onChange={props.userChange} value={props.user.role}/>
        </div>
        <div className="small-12 medium-6 large-4 cell form-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Password" onChange={props.userChange} value={props.user.title}/>
        </div>
        <div className="small-12 medium-6 large-4 cell">
          <label>Organization
            <select id="orgId" name="orgId" value={props.user.orgId} onChange={props.userChange}>
              <option>None</option>
              {orgOptions}
            </select>
          </label>
        </div>
      </div>

    </div>
  );
}

UserEdit.propTypes = {
  user: PropTypes.object,
  orgs: PropTypes.array,
  saveUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  userChange: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired
};

export default UserEdit;