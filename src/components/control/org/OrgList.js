import React from 'react';

const renderOrgPreview = ( editOrg, org, i) => (

  <div className="small-12 medium-6 large-4 cell" key={i}>
    
    <div className="grid-x grid-padding-x grid-item-box">
      <div className="small-8 medium-8 large-8 cell"><h4>{org.name}</h4></div>
      <div className="small-4 medium-4 large-4 cell right">{org.orgId}</div>
      <div className="small-12 medium-12 large-12 cell detail-text left">Departments: {org.departments.length}</div>
      <div className="small-12 medium-12 large-12 cell detail-text left">Users:</div>
      <div className="small-12 medium-12 large-12 cell detail-text left">Apps:</div>
      <div className="small-12 medium-12 large-12 cell">
        <button type="button" className="button small p4-button right" onClick={() => editOrg(org)}>Edit</button>
      </div>
    </div>
  </div>

);

const renderOrgPreviews = (props) => (
  props.orgs.map((org, i) => renderOrgPreview(props.editOrg, org, i))
);

const OrgList = props => {
  var orgPreviews = null 
  var nbrItems = 0
  if (props.orgs) {
    orgPreviews = renderOrgPreviews(props);
    nbrItems = props.orgs.length;
  }

  return (
    <div>
      <div className="grid-container fluid">
        <div className="grid-x">
          { orgPreviews }
        </div>
      </div>
    </div>
  );
};

export default OrgList;