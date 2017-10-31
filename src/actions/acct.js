import axios from 'axios'
import { BASE_URL } from './config'
import { contentHeaders } from './config'
import { errorCallingApi, showBusy } from './utils'
import { baseUrl } from './qbo'
import store from '../store';

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
  console.log("getData: "+type);
  return (dispatch) => {
    if (type === 'coa') {
      dispatch(executeGetAccountsRequest())
    } else if (type === 'account-types') {
      dispatch(executeGetAccountTypesRequest())
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
        console.log("response: "+JSON.stringify(response));
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
        console.log("accounts: "+JSON.stringify(accounts));
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
        console.log("response: "+JSON.stringify(response));
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
        console.log("response: "+JSON.stringify(response));
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

export function executeSyncDataRequest(data) {
  console.log('executeSyncDataRequest:'+JSON.stringify(data));

  return (dispatch, getState) => {
  
    const token = getState().qboAuth.accessToken
    const realmId = getState().qboAuth.realmId

    const body = convertToQboAccount(data);
    const url = `${baseUrl}/v3/company/${realmId}/account`;
    
    const headers = {
      Accept: 'application/json'
      , Authorization: 'Bearer ' + token
      , 'Content-Type': 'application/json'
    }

    console.log("About http post to url:" + url);
    console.log("headers:" + JSON.stringify(headers));
    console.log("body:" + JSON.stringify(body));

    var config = {
      url: url
      , method: 'post'
      , headers: headers
      , data: body
      , responseType: 'json'
    };

    axios(config)
      .then((response) => {
        console.log("token response: "+JSON.stringify(response));
        
      })
      .catch((err) => {
        console.error("Error posting to: " + url + " " + JSON.stringify(err));
        dispatch(errorCallingApi("Error calling API: " + err))
      });
  }
}

function convertToQboAccount(data) {
  var newData = {
      "Name": data.acct,
//      "SubAccount": false,
      "FullyQualifiedName": data.acctDesc,
//      "Active": true,
      "Classification": getQboAccountClassification(data.majorType),
      "AccountType": getQboAccountType(data.subType),
//      "AccountSubType": null,
//      "CurrentBalance": 0.0,
//      "CurrentBalanceWithSubAccounts": 0.0,
      // "CurrencyRef": {
      //   "value": "USD",
      //   "name": "United States Dollar"
      // },
  };
  return newData;
}
 
function getQboAccountClassification(t) {
  switch (t) {
    case 'ASSET':
      return 'Asset';
    case 'LIABILITY':
      return 'Liability';
    case 'EXPENSE':
      return 'Expense';
    case 'REVENUE':
      return 'Revenue';
    case 'OWNERS EQUITY':
      return 'Equity';
    default:
      return 'TYPE-ERROR';
  }
}

function getQboAccountType(data) {

  var typeArray = [
  'Other Asset'
  , 'Non-Posting'
  , 'Fixed Asset'
  , 'Equity'
  , 'Accounts Payable'
  , 'Income'
  , 'Cost of Goods Sold'
  , 'Other Current Liability'
  , 'Credit Card'
  , 'Expense'
  , 'Other Income'
  , 'Bank'
  , 'Long Term Liability'
  , 'Other Expense'
  , 'Accounts Receivable'
  , 'Other Current Asset'];

  return 'Other Asset';

}

function findParentGroup(grp1, grp2) {
    let grpFound = false;

    // Is this the parent
    if (grp1.id == grp2.parentId) {
      console.log("Adding To Parent: "+grp1.title+"/"+grp1.id);
      grp2.level = grp1.level + 1;
      grp1.subGroups.push(grp2);
      grpFound = true;
    }
    // Search the tree
    else {
      
      grp1.subGroups.forEach(subGrp => { 
        if (!grpFound) {
          if (grp2.parentId == subGrp.id) {
            console.log("Adding To Parent: "+subGrp.title+"/"+subGrp.id);
            grp2.level = subGrp.level + 1;
            subGrp.subGroups.push(grp2);
            grpFound = true; 
          }
          else {
            grpFound = subGrp.findParentGroup(grp2);
          }
        }
      });
    }
    console.log("Returning grpFound: "+grpFound);
    return grpFound;
  }


export function showSyncStatus (data) {
  console.log('showSyncStatus:'+JSON.stringify(data));
}
