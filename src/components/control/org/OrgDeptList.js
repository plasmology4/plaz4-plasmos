import React from 'react';

const renderDept = ( deptChange, dept, i) => (

  <div key={i} className="small-12 medium-12 large-12 cell">
    <div className="grid-x grid-padding-x">
      <div className="small-12 medium-6 large-4 cell form-field">
        <label htmlFor="name">Department Name</label>
        <input key={i} type="text" id="name" name="name" value={dept.name} placeholder="Department Name" onChange={(e) => deptChange(i, e)}/>
      </div>
      <div className="small-12 medium-6 large-3 cell form-field">
        <label htmlFor="deptId">ID</label>
        <input key={i} type="text" id="deptId" name="deptId" value={dept.deptId} placeholder="id" onChange={(e) => deptChange(i, e)}/>
      </div>
      <div className="small-11 medium-6 large-4 cell form-field">
        <label htmlFor="desc">Description</label>
        <input key={i} type="text" id="desc" name="desc" value={dept.desc} placeholder="Description" onChange={(e) => deptChange(i, e)}/>
      </div>
      <div className="small-1 medium-6 large-1 cell form-field">
        <button type="button" className="left remove-button" onClick={() => this.props.removeDept(this.props.dept)}><i className="material-icons">remove_circle_outline</i></button>
      </div>
    </div>
  </div>

);

const renderDepts = (props) => (
  props.depts.map((dept, i) => renderDept(props.deptChange, dept, i))
);

const OrgDeptList = props => {

  var deptList = null 
  if (props.depts) {
    deptList = renderDepts(props);
  }

  return (

    <div className="grid-x grid-padding-x form-box">
      <div className="small-10 medium-10 large-10 cell">
        <h4>Departments</h4>
      </div>
      <div className="small-2 medium-2 large-2 cell">
        <button type="button" className="right white-icon" onClick={() => props.addDept()}><i className="material-icons">add_circle_outline</i></button>
      </div>
      { deptList }
    </div>
  );
};

export default OrgDeptList;