import axios from 'axios'
import { BASE_URL } from '../config'
import { contentHeaders } from '../config'
import { errorCallingApi, showBusy, notify } from '../utils'
import { baseUrl } from './qbo'

const throttleTimeout = 60*1000 / 60;  

export async function getQboAccount(name, nbr, qboAuth) {
  console.log('getQboAccount: ' + name + ' ' + nbr);
  const token = await qboAuth.accessToken
  const realmId = await qboAuth.realmId

  const queryUrl = `${baseUrl}v3/company/${realmId}/query?query=`;
  const nameQuery = `select * from Account where Name = '${name}'`;
  const method = 'get';
  const body = {};
  const url = queryUrl + encodeURIComponent(nameQuery)
                          .replace(/\x2a/g, '%2A')
                          .replace(/'/g, '%27')
                      + '&minorversion=4';

  const headers = {
    Accept: 'application/json'
    , Authorization: 'Bearer ' + token
    , 'Content-Type': 'application/json'
  }
  
  console.debug("Execute http " + method + " to url:" + url);
  console.debug("headers:" + JSON.stringify(headers));
  console.debug("body:" + JSON.stringify(body));

  var config = {
    url: url
    , method: method
    , headers: headers
    , data: body
    , responseType: 'json'
  };

  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      axios(config)
      .then((response) => {
        console.debug('response:'+JSON.stringify(response));
        if (response.data.QueryResponse.Account) {
          var items = response.data.QueryResponse.Account;
          console.log('Found ' + items.length + ' QBO accounts with name: '+name);
          var foundMatch = false;
          for (let item of items) {
            console.log('AcctNum: '+item.AcctNum);
            if (item.AcctNum === nbr) {
              foundMatch = true;
              resolve(item);
            }
          }
          if (!foundMatch) {
            console.log('No accounts with name: ' + name + ' had matching number: ' + nbr );
            resolve(null);
          }
        } else {
          console.log('No items found');
          resolve(null);
        }
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        var msg = "Error Getting QBO Account: " + JSON.stringify(err) ;
        console.error(msg);
        reject(msg);
      });
    }, throttleTimeout);
  });

}

export async function createAccountStructure(qboAuth) {
  console.debug('createAccountStructure: '+qboAuth);
  var accountStructure = require('./QboParentTypes.json');
  var parentTypes = accountStructure.QueryResponse.Account;
  console.log('Parent types: ' +  parentTypes.length );

  // Sort the array by Id so they are created in the correct order.
  // parentTypes.sort(function(a, b) {
  //   return parseFloat(a.Id) - parseFloat(b.Id);
  // });

  var mapByName = new Map();
  var mapById = new Map();
  parentTypes.forEach( account => { 
    mapByName.set(account.Name, account);
    mapById.set(account.Id, account);
  });

  var mapNewByName = new Map();
  var mapNewById = new Map();

  for (let account of parentTypes) {

    var newAccount = await createTypeForUpload(account);

    if (newAccount.SubAccount === true) {
      var parentName = mapById.get(account.ParentRef.value).Name;
      console.log('For ' + newAccount.Name + ' > Lookup Parent By Name: '+parentName);
      var newParentAccount = mapNewByName.get(parentName);
      if (newParentAccount) {
        newAccount['ParentRef']= { value: newParentAccount.Id };
      } else {
        console.log('No parent found in map');
      }
    }

    await createQboAccount(newAccount, qboAuth)
    .then(qboAccount => {
      notify('success', 'Created: '+qboAccount.Name)
      mapNewByName.set(qboAccount.Name, qboAccount);
      mapNewById.set(qboAccount.Id, qboAccount);
    })
    .catch(async err => {
      console.error('Error in createQboAccount - It may exist already.  Try to load it from QB... ');
      // Try to load the account.
      await getQboAccount(newAccount.Name, newAccount.AcctNum, qboAuth)
      .then(existingAccount => {
        console.log("Found existing: ");
        (existingAccount)?notify('success', 'Existing: '+newAccount.Name):notify('error','No existing account found: '+newAccount.Name);
        mapNewByName.set(existingAccount.Name, existingAccount);
      })
      .catch(err => { 
        console.error('Error in getQboAccount > See stack above');
      });
    });
  }
}

function createTypeForUpload(qboAccount) {
  return {
    "Name": qboAccount.Name
    , "SubAccount": qboAccount.SubAccount
    , "Description": qboAccount.Description
    , "Classification": qboAccount.Classification
    , "AccountType": qboAccount.AccountType
    , "AccountSubType": qboAccount.AccountSubType
  };
}

export function createQboAccount(account, qboAuth) {
  console.log('createQboAccount:'+JSON.stringify(account));

  
  const token = qboAuth.accessToken
  const realmId = qboAuth.realmId
  var url = `${baseUrl}v3/company/${realmId}/account`;

  const headers = {
    Accept: 'application/json'
    , Authorization: 'Bearer ' + token
    , 'Content-Type': 'application/json'
  }

  console.log("About http post to url:" + url);
  console.log("headers:" + JSON.stringify(headers));
  
  var config = {
    url: url
    , method: 'post'
    , headers: headers
    , data: account
    , responseType: 'json'
  };

  return new Promise(function(resolve, reject) {
    setTimeout(async () => {
      await axios(config)
      .then((response) => {
        console.debug('newAccount: '+JSON.stringify(response));
        var newAccount = response.data.Account;
        
        resolve(newAccount);
      })
      .catch((err) => {
        //console.error(JSON.stringify(err));
        var msg = "Error Creating New QBO Account: " + JSON.stringify(err) ;
        console.error(msg);
        reject(msg);
      });
    }, throttleTimeout);
  });
}

export function showSyncStatus(data, qboAuth) {
  console.log('showSyncStatus:'+JSON.stringify(data));     
  
    const token = qboAuth.accessToken
    const realmId = qboAuth.realmId
    const queryUrl = `${baseUrl}v3/company/${realmId}/query?query=`;

    const nameQuery = `select * from Account where Name ='${data.acctDesc}'`;


    const method = 'get';
    const body = {};
    const url = queryUrl + encodeURIComponent(nameQuery)
                            .replace(/\x2a/g, '%2A')
                            .replace(/'/g, '%27')
                        + '&minorversion=4';

    const headers = {
      Accept: 'application/json'
      , Authorization: 'Bearer ' + token
      , 'Content-Type': 'application/json'
    }

    console.log("Execute http " + method + " to url:" + url);
    console.log("headers:" + JSON.stringify(headers));
    //console.log("body:" + JSON.stringify(body));

    var config = {
      url: url
      , method: method
      , headers: headers
      , data: body
      , responseType: 'json'
    };

    axios(config)
        .then((response) => {
          console.log("Data: "+JSON.stringify(response));
          if (response.data.QueryResponse.Account) {
            notify("success", JSON.stringify(response.data.QueryResponse.Account, null, '\t'));
          } else {
            notify("info", 'No data found');            
          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
        });
}



function extractErrorMsg(err) {
  var errMsg;
  if (err) {
    if (err.response.data.Fault.Error[0].Message) {
      errMsg = JSON.stringify(err.response.data.Fault.Error[0].Message);
    } else if (err.response.data) {
      errMsg = JSON.stringify(err.response.data);
    }
  }
  else {
    errMsg = "No error details exist";
  }
  return errMsg;
}

export function deleteAllAccounts(qboAuth) {
  console.log('deleteAllAccounts:');
  loadParentCache(qboAuth, null)
      .then(async (parentCache) => {
        var keys = parentCache.keys();

        for (let key of keys) {

          var account = parentCache.get(key);
          account.Active = false;

          await createQboAccount(account, qboAuth)
            .then(qboAccount => {
              notify('success', 'Set active to false: '+qboAccount.Name)
            })
            .catch(async err => {
              console.error('Error in setting active to false: '+JSON.stringify(err));
            });  
        }
      })
      .catch((err) => {
        var msg = "Error Deleting Accounts: " + JSON.stringify(err);
        console.error(msg);
      });
}

export function loadParentCache(qboAuth, parentCache) {
  console.log('loadParentCache:');

  parentCache = (parentCache)?parentCache:new Map();


  return new Promise(function(resolve, reject) {
    if (parentCache.size > 0) {
      console.log('Parent cache is already loaded.');
      resolve(parentCache); 
    } 
    else {
      const token = qboAuth.accessToken
      const realmId = qboAuth.realmId
      //}

      const queryUrl = `${baseUrl}v3/company/${realmId}/query?query=`;
      const nameQuery = `select * from Account order by Id`;
      const method = 'get';
      const body = {};
      const url = queryUrl + encodeURIComponent(nameQuery)
                              .replace(/\x2a/g, '%2A')
                              .replace(/'/g, '%27')
                          + '&minorversion=4';

      const headers = {
        Accept: 'application/json'
        , Authorization: 'Bearer ' + token
        , 'Content-Type': 'application/json'
      }
      
      console.debug("Execute http " + method + " to url:" + url);
      console.debug("headers:" + JSON.stringify(headers));
      console.debug("body:" + JSON.stringify(body));

      var config = {
        url: url
        , method: method
        , headers: headers
        , data: body
        , responseType: 'json'
      };

      axios(config)
      .then((response) => {
        var items = response.data.QueryResponse.Account;

        items.forEach(item => { 
          const key = item.Name.toUpperCase();
          console.log("Key: "+key);
          parentCache.set(key, item); 
        });

        console.debug("Data: "+JSON.stringify(items));
        console.log("Cached Items: "+parentCache.size)
        resolve(parentCache);
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        var msg = "Error Loading Parent Cache: " + JSON.stringify(err) ;
        console.error(msg);
        reject(msg);
      });
    }
  });    
}

export function executeSyncDataRequest(item, qboAuth, parentCache) {
  console.log('executeSyncDataRequest:'+JSON.stringify(item));
  
  const token = qboAuth.accessToken
  const realmId = qboAuth.realmId
  var url = `${baseUrl}v3/company/${realmId}/account`;

  const headers = {
    Accept: 'application/json'
    , Authorization: 'Bearer ' + token
    , 'Content-Type': 'application/json'
  }

  return new Promise(function(resolve, reject) {

    loadParentCache(qboAuth, parentCache)
      .then((parentCache) => {
        var body = convertToQboAccount(item, parentCache);

        return getQboAccount(item.acctDesc.trim(), item.acct, qboAuth)
          .then((qboAccount) => {
            console.log("Found QBO Account Updating:" + JSON.stringify(qboAccount));
            
            if (qboAccount) {
              body['Id'] = qboAccount.Id;
              body['SyncToken'] = qboAccount.SyncToken;
              // Set the update parameter on the url
              url = url + '?operation=update';
            }
            
            console.debug("About http post to url:" + url);
            console.debug("headers:" + JSON.stringify(headers));
            console.debug("body:" + JSON.stringify(body));

            var config = {
              url: url
              , method: 'post'
              , headers: headers
              , data: body
              , responseType: 'json'
            };

            axios(config)
              .then((response) => {
                var msg = "Sync Successful: "+config.data.AcctNum;
                console.log(msg);
                notify("success", msg );
                resolve(msg);
              })
              .catch((err) => {
                var errMsg = extractErrorMsg(err);
                var msg = "Error Syncing: " + config.data.AcctNum + " " + config.data.Name + " " + errMsg ;
                console.error(msg);
                notify("error", msg );
                reject(msg);
              });
          })
          .catch((err) => {
            //console.log("No QBO Account Found - Inserting:" );
            var msg = "Error Syncing: " + JSON.stringify(err);
            console.error(msg);
          });
      })
      .catch((err) => {
        var msg = "Error Syncing: " + JSON.stringify(err);
        console.error(msg);
      });
  });
}

export async function executeSyncAll(type, qboAuth) {
  console.log('executeSyncAll:'+JSON.stringify(type));
  

  const token = qboAuth.accessToken
  const realmId = qboAuth.realmId
  const url = `${baseUrl}v3/company/${realmId}/account`;
  var sourceDataUrl = `${BASE_URL}/acct/parse-accounts`;
  var uploadStatus = new Map();

  notify("info", "Initiated Syncronize All: "+type);

  var config = {
    url: sourceDataUrl
    , method: 'get'
    , headers: contentHeaders
    , data: {}
    , responseType: 'json'
  };

  var parentCache = new Map();
  var items;

  await axios(config)
    .then(async (response) => {
      //console.debug("Sync All Data Response: "+JSON.stringify(response));
      console.log("Sync All Data Items: "+response.data.length);
      items = response.data;
      var status = response.status + " " + response.statusText;

      
    })
    .catch((err) => { 
      console.error("Error calling API: " + sourceDataUrl);
      console.log(JSON.stringify(err));
    });

  if (!items) {
    notify("error", "No item data returned");
    throw Error("No item data returned");
  }
  else {
    console.log("executeSyncAll:" + items.length + " items to sync");

        loadParentCache(qboAuth, parentCache)
          .then(async (parentCache) => {
        var i = 0
        for (let item of items) {
          i++;
          // if( i > 5) break;  // this line is for testing a small number of items
          console.log("Syncing item " + i + " of " + items.length);
          
          await setTimeout(async () => {}, throttleTimeout);
          await executeSyncDataRequest(item, qboAuth, parentCache)
          .then((status) => {
            //notify("success", status );
            console.log(JSON.stringify(status));
          })
          .catch((err) => {
            //notify("error", err );
            console.log(JSON.stringify(err));
          });
        } 
      })
      .catch((err) => {
        console.error("Error calling loadParentCache");
        console.log(JSON.stringify(err));
      });
  }  
}

function convertToQboAccount(origData, parentCache) {
  var qboData = {
      "AcctNum": origData.acct 
      , "Name": origData.acctDesc.trim()
      , "Classification": getQboAccountClassification(origData.majorType)
  };
 
  if (parentCache) {
    var parent = parentCache.get(origData.subType);
    if (parent) {
      console.log("Parent Found:"+JSON.stringify(parent));
      qboData['ParentRef'] = { value: parent.Id };
      qboData['AccountType'] = parent.AccountType
      qboData['AccountSubType'] = parent.AccountSubType;
    } else {
      console.log("No Parent Found For:"+JSON.stringify(origData.subType));
    }
  } else {
    console.log("No parent cache");
  }

  return qboData;
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