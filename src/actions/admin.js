import axios from 'axios'
import { BASE_URL } from './config'
import { contentHeaders } from './config'

export function userList(users) {
  return {
    type: 'USER_LIST',
    userList: users
  };
}

export function addingUser(bool) {
  return {
    type: 'ADDING_USER',
    addingUser: bool
  };
}

export function editingUserId(userId) {
  return {
    type: 'EDITING_USER',
    editingUserId: userId
  };
}

export function hasErrored(bool) {
  return {
    type: 'HAS_ERRORED',
    hasErrored: bool
  };
}

export function isBusy(bool) {
  return {
    type: 'IS_BUSY',
    isBusy: bool
  };
}

export function editUser(id, value) {
  return {
    type: 'USER_CHANGE',
    id: id,
    value: value
  };
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    user: user
  };
}

export function applyFilter(filter) {
  return {
    type: 'APPLY_FILTER',
    filter
  };
}

export function saveUserApi(session, user) {
    
  console.log("saveUserApi: " + JSON.stringify(user));
  const url = `${BASE_URL}/users`;

  let newHeaders = {...contentHeaders, Authorization: session.token }

  const body = { user: user.user };
  var config = { headers: newHeaders };

  return (dispatch) => {
    dispatch(isBusy(true));
    var status;
    axios.post(url, body, config)
      .then((response) => {
        console.log("response: "+JSON.stringify(response));
        
        dispatch(userList(response.data))
        
        dispatch(isBusy(true))
        
        return status;
      })
      .then((status) => {
        console.log("status: "+JSON.stringify(status));

      })
      .catch(() => dispatch(hasErrored(true)));
  };
}

export function deleteUserApi(session, user) {
    
  console.log("deleteUserApi: " + JSON.stringify(user));
  const url = `${BASE_URL}/users`;

  let newHeaders = {...contentHeaders, Authorization: session.token }

  const body = { user: user.user };
  var config = { headers: newHeaders };

  return (dispatch) => {
    dispatch(isBusy(true));
    var status;
    axios.post(url, body, config)
      .then((response) => {
        console.log("response: "+JSON.stringify(response));
        
        dispatch(userList(response.data))
        
        dispatch(isBusy(true))
        
        return status;
      })
      .then((status) => {
        console.log("status: "+JSON.stringify(status));

      })
      .catch(() => dispatch(hasErrored(true)));
  };
}


export function getUsersApi(session) {
    
  console.debug("getUsers: ");
  const url = `${BASE_URL}/users`;

  //const body = { user: user};
  var config = { headers: contentHeaders };

  return (dispatch) => {
    dispatch(isBusy(true))
    axios.get(url, config)
      .then((response) => {
        console.log("response: "+JSON.stringify(response));
        
        dispatch(userList(response.data))
        dispatch(isBusy(false))

        return response;
      })
      // .then((status) => {
      //   console.log("status: "+JSON.stringify(status));

      // })
      .catch(() => dispatch(hasErrored(true)));
  };
}

export function getUserApi(session, userId) {
    
  console.debug("getUserApi: " + userId);

  return (dispatch) => {
    
    if (userId === 'new') {
      dispatch(setUser({}))
    } else {
      dispatch(isBusy(true))
      const url = `${BASE_URL}/users/${userId}`;
      var config = { headers: contentHeaders };
      var status;
      axios.get(url, config)
        .then((response) => {
          console.log("response: "+JSON.stringify(response));
          dispatch(setUser(response.data))
          dispatch(isBusy(false))
          return status;
        })
        .then((status) => {
          console.log("status: "+JSON.stringify(status));
        })
        .catch(() => dispatch(hasErrored(true)));
    }
  }
}

