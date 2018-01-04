import axios from 'axios'
import moment from 'moment'
import { BASE_URL, contentHeaders } from '../config'
import { errorCallingApi, showBusy, notify } from '../utils'
import { getQboAccount } from './coa'
import { baseUrl } from './qbo'

const throttleTimeout = 60*1000 / 60;  


export function showSyncStatus(data) {
  console.log('showSyncStatus:'+JSON.stringify(data));

  return (dispatch, getState) => {
  
    const token = getState().qboAuth.accessToken
    const realmId = getState().qboAuth.realmId
    const queryUrl = `${baseUrl}v3/company/${realmId}/query?query=`;

    const nameQuery = `select * from Bill where Name ='${data.acctDesc}'`;


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
        if (response.data.QueryResponse.Bill) {
          notify("success", JSON.stringify(response.data.QueryResponse.Bill, null, '\t'));
        } else {
          notify("info", 'No data found');            
        }
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
      });
  }
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

export async function deleteApInvoicesFromQbo(filter, qboAuth) {
  console.log('deleteApInvoicesFromQbo: filter: '+JSON.stringify(filter));
  
  var filterInvoice;
  if (filter) {
    filterInvoice = filter.invoiceId;
  } else {
    // If filter is null, we need to load all

  }

  const token = qboAuth.accessToken
  const realmId = qboAuth.realmId
  const url = `${baseUrl}v3/company/${realmId}/bill`;
  var sourceDataUrl = `${BASE_URL}/acct/parse-ap-invoices`;

  if (filterInvoice) {
    sourceDataUrl = sourceDataUrl + '/' + filterInvoice;
  }

  notify("info", "Initiated AP Invoice Upload");

  var config = {
    url: sourceDataUrl
    , method: 'get'
    , headers: contentHeaders
    , data: {}
    , responseType: 'json'
  };

  var items;

  await axios(config)
    .then(async (response) => {
      //console.debug("Sync All Data Response: "+JSON.stringify(response));
      console.log("Sync Data Items: "+response.data.length);
      items = response.data;
      
      if (!items) {
        notify("error", "No item data returned");
        throw Error("No item data returned");
      }
      else {
        console.log("deleteApInvoicesFromQbo:" + items.length + " AP invoice line items to delete");

        var currentInvoice = [];
        var qboApInvoice = null;
        var checkInvoiceNbr = null;

        var accountCache = new Map();

        // Adding this to the endo of the array triggers 
        // the processing of the last invoice line item.
        items.push({invoiceNbr: 'LAST-ITEM'});

        var i = 0;

        for (let item of items) {
          
          // Have we hit the first line of a new invoice - the LAST-ITEM
          if (checkInvoiceNbr === null || checkInvoiceNbr !== item.invoiceNbr) {
            // This is a new number - process the current data if there is any
            if (currentInvoice.length > 0) {
              
              console.debug(">>>>>item:"+JSON.stringify(item));

              var apinvoiceInfo = { VendorRef:{ name: currentInvoice[0].vendor}, DocNumber: currentInvoice[0].invoiceId };
                  
              await updateQboBill(apinvoiceInfo, qboAuth, true)
              .then((status) => {
                //notify("success", status );
                console.log(JSON.stringify(status));
              })
              .catch((err) => {
                var msg = JSON.stringify(err.response.data.Fault.Error[0].Message + " >> " + err.response.data.Fault.Error[0].Detail )
                notify("error", "Error uploading AP Invoice: " + msg );
                console.log("Error uploading AP Invoice: " + msg);
              });
            }
            
            // Reset the curent data
            currentInvoice = [];
            currentInvoice.push(item);

          } else {
            // This is an additional line - add to the array
            currentInvoice.push(item);
          }

          //if( i > 5) break;  // this line is for testing a small number of items
          //console.log("Syncing item " + i + " of " + items.length);
          
          checkInvoiceNbr = item.invoiceNbr;

          //

          i++;
        }
      }
      
    })
    .catch((err) => { 
      console.error("Error calling API: " + sourceDataUrl);
      console.log(JSON.stringify(err));
    });
}


export async function uploadApInvoicesToQbo(filter, qboAuth) {
  console.log('uploadApInvoicesToQbo');
  
  var filterInvoice;
  if (filter) {
    filterInvoice = filter.invoiceId;
  } else {
    // If filter is null, we need to load all

  }

  const token = qboAuth.accessToken
  const realmId = qboAuth.realmId
  const url = `${baseUrl}v3/company/${realmId}/bill`;
  var sourceDataUrl = `${BASE_URL}/acct/parse-ap-invoices`;

  if (filterInvoice) {
    sourceDataUrl = sourceDataUrl + '/' + filterInvoice;
  }

  notify("info", "Initiated AP Invoice Upload");

  var config = {
    url: sourceDataUrl
    , method: 'get'
    , headers: contentHeaders
    , data: {}
    , responseType: 'json'
  };

  var items;

  await axios(config)
    .then(async (response) => {
      //console.debug("Sync All Data Response: "+JSON.stringify(response));
      console.log("Sync All Data Items: "+response.data.length);
      items = response.data;
      
      if (!items) {
        notify("error", "No item data returned");
        throw Error("No item data returned");
      }
      else {
        console.log("uploadApInvoicesToQbo:" + items.length + " AP invoice line items to sync");

        var currentInvoice = [];
        var qboApInvoice = null;
        var checkInvoiceNbr = null;

        var accountCache = new Map();

        // Adding this to the endo of the array triggers 
        // the processing of the last invoice line item.
        items.push({invoiceNbr: 'LAST-ITEM'});

        var i = 0;

        for (let item of items) {
          
          // Have we hit the first line of a new invoice - the LAST-ITEM
          if (checkInvoiceNbr === null || checkInvoiceNbr !== item.invoiceNbr) {
            // This is a new number - process the current data if there is any
            if (currentInvoice.length > 0) {
              
              console.debug(">>>>>item:"+JSON.stringify(item));

              // Lookup vendor by name
              await getQboVendor(currentInvoice[0].vendor, currentInvoice[0].vendorNbr, qboAuth)
                .then(async vendor => {
                  console.log("Found existing: ");
                  (vendor)?notify('success', 'Existing Vendor: '+vendor.CompanyName):notify('error','No existing vendor found: '+vendor.CompanyName);
                  
                  const vendorRef =  {
                    "value": vendor.Id
                    , "name": vendor.CompanyName
                  }

                  const apAccountName = 'Accounts Payable';
                  const apAccountNbr = '0002000';

                  // const apAccountName = 'Accounts Payable Liability';
                  // const apAccountNbr = '0002001';
                  // const apAccountName = 'Accounts Payable Liabilities';
                  // const apAccountNbr = '0002002';

                  var  apAccountRef;
                  await getQboAccount(apAccountName, apAccountNbr, qboAuth)
                    .then(qboAccount => {
                      console.log("Found existing: "+ JSON.stringify(qboAccount));
                      apAccountRef = { value: qboAccount.Id, name: qboAccount.Name };
                    })
                    .catch(err => { 
                      console.error('Error in getQboAccount for:'+apAccountName.trim());
                    });


                  var qboApInvoice = await convertToQboBill(qboAuth, currentInvoice, apAccountRef, vendorRef);
                  console.log("Uploading Invoice "+currentInvoice[0].invoiceNbr + " $" + currentInvoice[0].balanceDue + " / $" + currentInvoice[0].amount + " from "+ currentInvoice[0].vendor+" with " + currentInvoice.length + " lines");
                  console.log('Bill:'+JSON.stringify(qboApInvoice));

                  // Ready To Upload
                  await setTimeout(async () => {}, throttleTimeout);
                  await updateQboBill(qboApInvoice, qboAuth)
                  .then((status) => {
                    //notify("success", status );
                    console.log(JSON.stringify(status));
                  })
                  .catch((err) => {
                    var msg = JSON.stringify(err.response.data.Fault.Error[0].Message + " >> " + err.response.data.Fault.Error[0].Detail )
                    notify("error", "Error uploading AP Invoice: " + msg );
                    console.log("Error uploading AP Invoice: " + msg);
                  });

                })
                .catch(err => { 
                  console.error('Error in getQboVendor > See stack above');
                }); 

            }
            
            // Reset the curent data
            currentInvoice = [];
            currentInvoice.push(item);

          } else {
            // This is an additional line - add to the array
            currentInvoice.push(item);
          }

          //if( i > 5) break;  // this line is for testing a small number of items
          //console.log("Syncing item " + i + " of " + items.length);
          
          checkInvoiceNbr = item.invoiceNbr;

          //

          i++;
        }
      }
      
    })
    .catch((err) => { 
      console.error("Error calling API: " + sourceDataUrl);
      console.log(JSON.stringify(err));
    });
}

export function updateQboBill(apInvoice, qboAuth, deleteOp) {
  console.log('updateQboBill:'+JSON.stringify(apInvoice));
  console.log('deleteOp:'+deleteOp);

  
  const token = qboAuth.accessToken
  const realmId = qboAuth.realmId
  var url = `${baseUrl}v3/company/${realmId}/bill`;
  var operation = (deleteOp)?"delete":"update";

  const headers = {
    Accept: 'application/json'
    , Authorization: 'Bearer ' + token
    , 'Content-Type': 'application/json'
  }

  console.log("About http post to url:" + url);
  console.log("headers:" + JSON.stringify(headers));

  var body = (!deleteOp)?apInvoice:{};

  return getQboBill(apInvoice.VendorRef.name, apInvoice.DocNumber, qboAuth)
    .then((qboBill) => {
      console.log("Found QBO Bill Updating:" + JSON.stringify(qboBill));
      
      if (qboBill) {
        body['Id'] = qboBill.Id;
        body['SyncToken'] = qboBill.SyncToken;
        // Set the update parameter on the url
        url = url + '?operation='+operation;
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

      return new Promise(function(resolve, reject) {

        axios(config)
          .then((response) => {
            var msg = "Sync Successful: "+config.data.DocNumber;
            console.log(msg);
            notify("success", msg );
            resolve(msg);
          })
          .catch((err) => {
            var errMsg = extractErrorMsg(err);
            var msg = "Error Syncing: " + config.data.DocNumber + " " + errMsg ;
            console.error(msg);
            notify("error", msg );
            reject(msg);
          });
      });
    })
    .catch((err) => {
      //console.log("No QBO Bill Found - Inserting:" );
      var msg = "Error Syncing: " + JSON.stringify(err);
      console.error(msg);
    });

}

export async function getQboBill(name, nbr, qboAuth) {
  console.log('getQboBill: ' + name + ' ' + nbr);
  const token = await qboAuth.accessToken
  const realmId = await qboAuth.realmId

  const queryUrl = `${baseUrl}v3/company/${realmId}/query?query=`;
  const nameQuery = `select * from Bill where DocNumber = '${nbr}'`;
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
        if (response.data.QueryResponse.Bill) {
          var items = response.data.QueryResponse.Bill;
          console.log('Found ' + items.length + ' QBO bills with number: '+nbr);
          var foundMatch = false;
          for (let item of items) {
            console.log('VendorRef.name: '+item.VendorRef.name);
            if (item.VendorRef.name === name) {
              foundMatch = true;
              resolve(item);
            }
          }
          if (!foundMatch) {
            console.log('No Bills with number: ' + nbr + ' had matching vendor name: ' + name );
            resolve(null);
          }
        } else {
          console.log('No items found');
          resolve(null);
        }
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        var msg = "Error Getting QBO Bill: " + JSON.stringify(err) ;
        console.error(msg);
        reject(msg);
      });
    }, throttleTimeout);
  });

}

async function convertToQboBill(qboAuth, origData, apAccountRef, vendorRef) {
  
  console.log('Test origData: '+JSON.stringify(origData));
  console.log('Test DueDate: '+origData[0].dueDate);

  var qboData = {
    "DueDate": moment(origData[0].dueDate).format("YYYY-MM-DD")
    , "Balance": origData[0].balanceDue
    , "DocNumber": origData[0].invoiceId
    , "PrivateNote": "Invoice Number: " + origData[0].invoiceNbr 
                   + "\n" + "Invoice Date: " + moment(origData[0].invoiceDate).format("YYYY-MM-DD")
                   + "\n" + "Exp Account: " + origData[0].acct.trim() +"/" +origData[0].acctName.trim()
    , "domain": "QBO"
    , "sparse": false
    , "TxnDate": "2017-12-31"
    , "CurrencyRef": {
        "value": "USD"
        , "name": "United States Dollar"
      }
    , "Line": []
    , "VendorRef": vendorRef
    , "APAccountRef": apAccountRef
    , "TotalAmt": origData[0].amount
  };
  
  var errors = [];
  var i=0;

  // Add Lines
  for (let lineItem of origData) {
    
    // Lookup account ref
    var qboAcctRef = null;

    // This line gets the account ref but we don't want to double book to expense accounts
    // so we are going to book all ap invoices to ''
    //await getQboAccount(lineItem.acctName.trim(), lineItem.acct.trim(), qboAuth)
    await getQboAccount('Other General Expense', '9009000', qboAuth)
      .then(qboAccount => {
        console.log("Found existing: "+ JSON.stringify(qboAccount));
        qboAcctRef = { value: qboAccount.Id, name: qboAccount.Name };
        var line = {
          "Id": i
          , "Description": qboAcctRef.name
          , "Amount": lineItem.lineAmount
          , "DetailType": "AccountBasedExpenseLineDetail"
          , "AccountBasedExpenseLineDetail": {
              "AccountRef": qboAcctRef
              , "BillableStatus": "NotBillable"
              , "TaxCodeRef": {
                "value": "TAX"
              }
            }
          };
        qboData.Line.push(line);
      })
      .catch(err => { 
        errors.push("No QBO Bill: "+lineItem.acctName);
        console.error('Error in getQboAccount for:'+lineItem.acctName.trim());
      });

    i++;
  } 

  return qboData;
}

export async function getQboVendor(name, nbr, qboAuth) {
  console.log('getQboVendor: '+name);
  const token = await qboAuth.accessToken
  const realmId = await qboAuth.realmId

  const resource = 'vendor';
  const queryUrl = `${baseUrl}v3/company/${realmId}/query?query=`;
  const nameQuery = `select * from vendor where CompanyName='${name}'`;
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
        if (response.data.QueryResponse.Vendor) {
          var items = response.data.QueryResponse.Vendor;
          console.log('Found ' + items.length + ' QBO '+resource+' with name: '+name);
          var foundMatch = false;
          for (let item of items) {
            console.log(resource+' id: '+item.Id);
            if (item.CompanyName === name) {
              foundMatch = true;
              resolve(item);
            }
          }
          if (!foundMatch) {
            console.log('No '+resource+' with name: ' + name + ' had matching number: ' + nbr );
            resolve(null);
          }
        } else {
          console.log('No items found');
          resolve(null);
        }
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        var msg = 'Error Getting QBO ' + resource + ': ' + JSON.stringify(err) ;
        console.error(msg);
        reject(msg);
      });
    }, throttleTimeout);
  });

}
