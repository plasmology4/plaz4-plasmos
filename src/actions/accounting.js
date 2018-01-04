import axios from 'axios'
import { BASE_URL } from './config'
import { contentHeaders } from './config'
import { errorCallingApi, showBusy, notify } from './utils'
import { baseUrl } from './qbo/qbo'

const throttleTimeout = 60*1000 / 60;  


export function newAccount(account) {
  return {
    type: 'ADD_NEW_ACCOUNT',
    account: account
  };
}

export function accountData(accounts) {
  return {
    type: 'ACCOUNTS_CHANGE',
    accounts: accounts
  };
}

export function apiCallStatus(status) {
  return {
    type: 'API_CALL_STATUS',
    status: status
  };
}

export function  getData(type) {
  return (dispatch) => {
    if (type === 'coa') {
      dispatch(executeGetAccountsRequest())
    } else if (type === 'account-types') {
      dispatch(executeGetAccountTypesRequest())
    } else if (type === 'ap-invoices') {
      dispatch(executeGetApInvoicesRequest())
    } else if (type === 'journal-entries') {
      dispatch(executeGetJournalEntriesRequest())
    }
  }
}

export function executeGetAccountsRequest(filter) {

  const config = { headers: contentHeaders };
  const resourceUrl = `${BASE_URL}/acct/parse-accounts`;
  var accounts;
  var status;

  return (dispatch) => {
    console.log("1");
    dispatch(showBusy(true));
    axios.get(resourceUrl, config)
      .then((response) => {
        console.debug("response: "+JSON.stringify(response));
        accounts = response.data;
        status = response.status + " " + response.statusText;
        if (!accounts) {
          throw Error("No organization data returned");
        }
        else {
          
          // Dispatch the results
        }
        return accounts;
      })
      //.then((response) => response.json())
      .then((accounts) => {
        console.debug("accounts: "+JSON.stringify(accounts));
        dispatch(accountData(accounts));
        dispatch(apiCallStatus(status));
        dispatch(showBusy(false));
      })
      .catch(() => { 
        dispatch(errorCallingApi("Error calling API: " + resourceUrl));
        dispatch(showBusy(false));
      });
  };
}

export function executeGetAccountTypesRequest(filter) {

  const config = { headers: contentHeaders };
  const resourceUrl = `${BASE_URL}/acct/parse-types`;
  var accountTypes = new Map();
  var status;

  return (dispatch) => {
    console.log("1");
    dispatch(showBusy(true));
    axios.get(resourceUrl, config)
      .then((response) => {
        console.debug("response: "+JSON.stringify(response));
        accountTypes = response.data;
        status = response.status + " " + response.statusText;
        if (!accountTypes) {
          throw Error("No organization data returned");
        }
        else {
          
          // Dispatch the results
        }
        return accountTypes;
      })
      //.then((response) => response.json())
      .then((accountTypes) => {
        console.log("account-types: "+JSON.stringify(accountTypes));
        dispatch(accountData(accountTypes));
        dispatch(apiCallStatus(status));
        dispatch(showBusy(false));
      })
      .catch(() => { 
        dispatch(errorCallingApi("Error calling API: " + resourceUrl));
        dispatch(showBusy(false));
      });
  };
}

export function executeGetApInvoicesRequest(filter) {

  const config = { headers: contentHeaders };
  const resourceUrl = `${BASE_URL}/acct/parse-ap-invoices`;
  var items = new Map();
  var status;

  return (dispatch) => {
    console.log("1");
    dispatch(showBusy(true));
    axios.get(resourceUrl, config)
      .then((response) => {
        console.debug("response: "+JSON.stringify(response));
        items = response.data;
        status = response.status + " " + response.statusText;
        if (!items) {
          throw Error("No organization data returned");
        }
        else {
          
          // Dispatch the results
        }
        return items;
      })
      //.then((response) => response.json())
      .then((items) => {
        console.debug("ap-invoices: "+JSON.stringify(items));
        dispatch(accountData(items));
        dispatch(apiCallStatus(status));
        dispatch(showBusy(false));
      })
      .catch(() => { 
        dispatch(errorCallingApi("Error calling API: " + resourceUrl));
        dispatch(showBusy(false));
      });
  };
}

export function executeGetJournalEntriesRequest(filter) {

  const config = { headers: contentHeaders };
  const resourceUrl = `${BASE_URL}/acct/parse-entries`;
  var journalEntries = new Map();
  var status;

  return (dispatch) => {
    console.log("1");
    dispatch(showBusy(true));
    axios.get(resourceUrl, config)
      .then((response) => {
        console.debug("response: "+JSON.stringify(response));
        journalEntries = response.data;
        status = response.status + " " + response.statusText;
        if (!journalEntries) {
          throw Error("No organization data returned");
        }
        else {
          
          // Dispatch the results
        }
        return journalEntries;
      })
      //.then((response) => response.json())
      .then((journalEntries) => {
        console.log("journal-entries: "+JSON.stringify(journalEntries));
        dispatch(accountData(journalEntries));
        dispatch(apiCallStatus(status));
        dispatch(showBusy(false));
      })
      .catch(() => { 
        dispatch(errorCallingApi("Error calling API: " + resourceUrl));
        dispatch(showBusy(false));
      });
  };
}


