import axios from 'axios'
import { BASE_URL } from './config'
import { contentHeaders } from './config'
import { errorCallingApi, showBusy } from './utils'

export function newUser(user) {
  return {
    type: 'ADD_NEW_USER',
    user: user
  };
}

export function userData(users) {
  return {
    type: 'USERS_CHANGE',
    users: users
  };
}

export function apiCallStatus(status) {
  return {
    type: 'API_CALL_STATUS',
    status: status
  };
}

export function executeGetUsersRequest(filter) {

  const config = { headers: contentHeaders };
  const userUrl = `${BASE_URL}/app/user`;
  var users;
  var status;

  return (dispatch) => {
    console.log("1");
    dispatch(showBusy(true));
    axios.get(userUrl, config)
      .then((response) => {
        console.log("response: "+JSON.stringify(response));
        users = response.data;
        status = response.status + " " + response.statusText;
        if (!users) {
          throw Error("No organization data returned");
        }
        else {
          
          // Dispatch the results
        }
        return users;
      })
      //.then((response) => response.json())
      .then((users) => {
        console.log("users: "+JSON.stringify(users));
        dispatch(userData(users));
        dispatch(apiCallStatus(status));
        dispatch(showBusy(false));
      })
      .catch(() => { 
        dispatch(errorCallingApi("Error calling API: " + userUrl));
        dispatch(showBusy(false));
      });
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
        dispatch(userData(users));
        dispatch(apiCallStatus(status));
      })
      .catch(() => dispatch(errorCallingApi("Error calling API: " + orgUsersUrl)));
  };
}

export function addNewUser(orgId) {
  console.log("action.addNewUser");
  var user = {
    id: 'new-user-id'
    , orgId: orgId
    , locId: ''
    , title: 'New User'
    , firstname: 'Firstname'
    , lastname: 'Lastname'
    , password: ''
    , email: ''
    , phone: ''
    , status: ''
    , role: ''};
  return(dispatch) => {
    dispatch(newUser(user));
  };
}

export function executeSaveUserRequest(user) {
console.log("executeSaveUserRequest:"+JSON.stringify(user));
  const config = { headers: contentHeaders };
  const userUrl = `${BASE_URL}/app/user`;
  var status;
  const body = { user: user };


  return (dispatch) => {
    console.log("1");
    //dispatch(loginIsPending(true));
    //console.log("2");
    //var session;
    //var user;
    axios.post(userUrl, body, config)
      .then((response) => {
        console.log("************response: "+JSON.stringify(response));
        status = response.data;
        dispatch(apiCallStatus(status));
        return status;
      })
      .catch(() => dispatch(errorCallingApi("Error calling API: " + userUrl)));
  };
}

export function executeDeleteUserRequest(user) {

  const config = { headers: contentHeaders };
  const userUrl = `${BASE_URL}/app/user/`+user._id;
  var status;
  const body = { user: user };


  return (dispatch) => {
    console.log("1");
    //dispatch(loginIsPending(true));
    //console.log("2");
    //var session;
    //var user;
    axios.delete(userUrl, config)
      .then((response) => {
        console.log("************response: "+JSON.stringify(response));
        status = response.data;
        dispatch(apiCallStatus(status));
        return status;
      })
      .catch(() => dispatch(errorCallingApi("Error calling API: " + userUrl)));
  };
}
