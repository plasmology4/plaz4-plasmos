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

export async function uploadApInvoicesToQbo(filter, qboAuth) {
  console.log('uploadApInvoicesToQbo');
  
  var filterInvoice;
  if (filter) {
    filterInvoice = filter.invoiceId;
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
        var qboInvoice = null;
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

                  const apAccountName = 'Accounts Payable Liability';
                  const apAccountNbr = '0002001';
                  var  apAccountRef;
                  await getQboAccount(apAccountName, apAccountNbr, qboAuth)
                    .then(qboAccount => {
                      console.log("Found existing: "+ JSON.stringify(qboAccount));
                      apAccountRef = { value: qboAccount.Id, name: qboAccount.Name };
                    })
                    .catch(err => { 
                      console.error('Error in getQboAccount for:'+apAccountName.trim());
                    });


                  var qboInvoice = await convertToQboBill(qboAuth, currentInvoice, apAccountRef, vendorRef);
                  console.log("Uploading Invoice "+currentInvoice[0].invoiceNbr + " $" + currentInvoice[0].balanceDue + " / $" + currentInvoice[0].amount + " from "+ currentInvoice[0].vendor+" with " + currentInvoice.length + " lines");
                  console.log('Bill:'+JSON.stringify(qboInvoice));

                  // Ready To Upload


                })
                .catch(err => { 
                  console.error('Error in getQboVendor > See stack above');
                });
              
              
              // await setTimeout(async () => {}, throttleTimeout);
              // await executeSyncDataRequest(item, qboAuth, apAccountRef)
              // .then((status) => {
              //   //notify("success", status );
              //   console.log(JSON.stringify(status));
              // })
              // .catch((err) => {
              //   //notify("error", err );
              //   console.log(JSON.stringify(err));
              // });

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

async function convertToQboBill(qboAuth, origData, apAccountRef, vendorRef) {
  
  console.log('Test origData: '+JSON.stringify(origData));
  console.log('Test DueDate: '+origData[0].dueDate);

  var qboData = {
    "DueDate": moment(origData[0].dueDate).format("YYYY-MM-DD")
    , "Balance": origData[0].balanceDue
    , "domain": "QBO"
    , "sparse": false
    , "TxnDate": moment(origData[0].invoiceDate).format("YYYY-MM-DD")
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

    await getQboAccount(lineItem.acctName.trim(), lineItem.acct.trim(), qboAuth)
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
              , "BillableStatus": "Billable"
              , "TaxCodeRef": {
                "value": "TAX"
              }
            }
          };
        qboData.Line.push(line);
      })
      .catch(err => { 
        errors.push("No QBO Account: "+lineItem.acctName);
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
