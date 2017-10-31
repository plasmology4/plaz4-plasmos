import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addNewOrg, executeGetOrgsRequest, executeGetOrgUsersRequest, executeSaveOrgRequest, executeDeleteOrgRequest } from '../../../actions/org'

import OrgToolbar from './OrgToolbar'
import OrgList from './OrgList'
import OrgEdit from './OrgEdit'

class OrgContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log("OrgContainer.constructor");
    
    this.state = {
      editingOrg: null,
      isEditing: false
    };

    this.updateOrgState = this.updateOrgState.bind(this);
    this.editOrg = this.editOrg.bind(this);
    this.addDept = this.addDept.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.displayList = this.displayList.bind(this);
    this.updateDeptState = this.updateDeptState.bind(this);

  }

  componentDidMount() {
    console.log("OrgContainer.componentDidMount");
    this.props.getOrgs();

  }

  // Called when the edit button is clicked on the list object
  editOrg(org) {
    console.log("editOrg:"+JSON.stringify(org));
    this.setState({isEditing:true, editingOrg: org})
    this.props.getOrgUsers(org.orgId);
  }

  addDept() {
    console.log("addDept");
    var org = this.state.editingOrg;
    org.departments.push({deptId:'', name:'', desc:''});    
    this.setState({editingOrg: org});
  }

  cancelEdit() {
    console.log("cancelEdit");
    this.setState({isEditing:false});
  }

  displayList() {
    console.log("displayList()");
    this.setState({isEditing:false});
  }

  // Called by the edit component to update the object being editied
  updateOrgState(event) {
    console.log("updateOrgState");
    const field = event.target.name;
    const org = this.state.editingOrg;
    org[field] = event.target.value;
    return this.setState({editingOrg: org});
  }
  
  updateDeptState(i, event) {
    console.log("updateDeptState.key:"+i);
    console.log("updateDeptState.name:"+event.target.name);
    const field = event.target.name;
    //const i = event.target.key
    const org = this.state.editingOrg;
    org.departments[i][field] = event.target.value;
    return this.setState({editingOrg: org});
  }
  
  render() {

    if (this.state.isEditing) {
      return (
        <div>
          <OrgEdit org={this.state.editingOrg} 
                    saveOrg={this.props.saveOrg} 
                    deleteOrg={this.props.deleteOrg} 
                    cancelEdit={this.cancelEdit} 
                    orgChange={this.updateOrgState} 
                    addDept={this.addDept}
                    deptChange={this.updateDeptState}/>
        </div>
      );
    } 
    else {
      return (
        <div>
          <OrgToolbar newOrg={this.props.newOrg} displayList={this.displayList} refreshList={this.props.getOrgs}/>
          <OrgList orgs={this.props.orgs} editOrg={this.editOrg} />
        </div>
      );
    } 
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log("OrgContainer.mapStateToProps: "+JSON.stringify(state)); // state
  console.log("OrgContainer.ownProps: "+JSON.stringify(ownProps)); // ownProps
  console.log("OrgContainer.state.orgs: "+JSON.stringify(state.orgs));

  return {
    orgs: state.orgs,
    editingOrg: state.editingOrg
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("OrgContainer.mapDispatchToProps"); // state
  return {
    getOrgUsers: () => dispatch(executeGetOrgUsersRequest()), 
    getOrgs: () => dispatch(executeGetOrgsRequest()), 
    newOrg: () => dispatch(addNewOrg()),
    //addDept: () => dispatch(addNewDept()),
    saveOrg: (org) => dispatch(executeSaveOrgRequest(org)),
    deleteOrg: (org) => dispatch(executeDeleteOrgRequest(org))
  };
};

OrgContainer.propTypes = {
  newOrg: PropTypes.func,
  getOrgs: PropTypes.func,
  saveOrg: PropTypes.func,
  deleteOrg: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(OrgContainer);
