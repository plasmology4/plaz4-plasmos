import axios from 'axios'
import { BASE_URL } from './config'
import { contentHeaders } from './config'
import { errorCallingApi } from './utils'

export function newOrg(org) {
  return {
    type: 'ADD_NEW_ORG',
    org: org
  };
}

export function newDept(org) {
  return {
    type: 'ADD_NEW_DEPT',
    dept: org
  };
}

export function orgData(orgs) {
  return {
    type: 'ORGS_CHANGE',
    orgs: orgs
  };
}
export function orgUserData(orgUsers) {
  return {
    type: 'ORG_USER_CHANGE',
    orgUsers: orgUsers
  };
}

export function orgApiCallStatus(status) {
  return {
    type: 'ORG_API_CALL_STATUS',
    status: status
  };
}


export function executeGetOrgsRequest() {

  const config = { headers: contentHeaders };
  const orgUrl = `${BASE_URL}/app/org`;
  var orgs;
  var status;

  return (dispatch) => {
    console.log("1");
    axios.get(orgUrl, config)
      .then((response) => {
        console.log("response: "+JSON.stringify(response));
        orgs = response.data;
        status = response.status + " " + response.statusText;
        if (!orgs) {
          throw Error("No organization data returned");
        }
        else {
          
          // Dispatch the results
        }
        return orgs;
      })
      //.then((response) => response.json())
      .then((orgs) => {
        console.log("orgs: "+JSON.stringify(orgs));
        dispatch(orgData(orgs));
        dispatch(orgApiCallStatus(status));
      })
      .catch(() => dispatch(errorCallingApi("Error calling API: " + orgUrl)));
  };
}
export function executeGetOrgUsersRequest(orgId) {

  const config = { headers: contentHeaders };
  const orgUsersUrl = `${BASE_URL}/app/org/${orgId}/users`;
  var users;
  var status;

  return (dispatch) => {
    console.log("1");
    axios.get(orgUsersUrl, config)
      .then((response) => {
        console.log("response: "+JSON.stringify(response));
        users = response.data;
        status = response.status + " " + response.statusText;
        if (!users) {
          throw Error("No org user data returned");
        }
        else {
          // Dispatch the results
        }
        return users;
      })
      //.then((response) => response.json())
      .then((users) => {
        console.log("users: "+JSON.stringify(users));
        dispatch(orgUserData(users));
        dispatch(orgApiCallStatus(status));
      })
      .catch(() => dispatch(errorCallingApi("Error calling API: " + orgUsersUrl)));
  };
}
export function addNewOrg() {
  console.log("action.addNewOrg");
  var org = {    
      orgId: 'newOrgId'
    , name: '<Organization Name>'
    , website: '<Website URL>'
    , logoUrl: ''
    , info: '<Organization Info>'
    , specialties: ''
    , contactInfo: ''
    , status: 'NewUnsaved'
    , departments: []};
  return(dispatch) => {
    dispatch(newOrg(org));
  };
}

export function addNewDept(org) {
  console.log("action.addNewOrgDepartment");
  return(dispatch) => {
    dispatch(newDept(org));
  };
}

export function executeSaveOrgRequest(org) {

  const config = { headers: contentHeaders };
  const orgUrl = `${BASE_URL}/app/org`;
  var status;
  const body = { org: org };


  return (dispatch) => {
    console.log("1");
    //dispatch(loginIsPending(true));
    //console.log("2");
    //var session;
    //var user;
    axios.post(orgUrl, body, config)
      .then((response) => {
        console.log("************response: "+JSON.stringify(response));
        status = response.data;
        dispatch(orgApiCallStatus(status));
        return status;
      })
      .catch(() => dispatch(errorCallingApi("Error calling API: " + orgUrl)));
  };
}

export function executeDeleteOrgRequest(org) {

  const config = { headers: contentHeaders };
  const orgUrl = `${BASE_URL}/app/org/`+org._id;
  var status;
  const body = { org: org };


  return (dispatch) => {
    console.log("1");
    //dispatch(loginIsPending(true));
    //console.log("2");
    //var session;
    //var user;
    axios.delete(orgUrl, config)
      .then((response) => {
        console.log("************response: "+JSON.stringify(response));
        status = response.data;
        dispatch(orgApiCallStatus(status));
        return status;
      })
      .catch(() => dispatch(errorCallingApi("Error calling API: " + orgUrl)));
  };
}
