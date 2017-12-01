import axios from 'axios'
import moment from 'moment'
import { BASE_URL } from '../config'
import { contentHeaders } from '../config'
import { errorCallingApi, showBusy, notify } from '../utils'
import { getQboAccount } from './coa'
import { baseUrl } from './qbo'

const throttleTimeout = 60*1000 / 60; 

export function syncJournalEntry(item, qboAuth) {
  console.log("syncJournalEntry: "+JSON.stringify(item));
  notify("success", "syncJournalEntry");
}

export function uploadJournalEntriesToQbo(filter, qboAuth) {
  console.log("uploadJournalEntriesToQbo: "+JSON.stringify(filter));
  notify("success", "uploadJournalEntriesToQbo");

  getSourceJournalEntryData(filter)
    .then(async (journalEntries) => {
      console.log("journalEntries: "+journalEntries.length);

      var txnDate = new Date(filter.year, filter.period, 0);

      var journalEntry = {
        TxnDate:  moment(txnDate).format("YYYY-MM-DD")
        , Line:[]
      };

      var total = new Number(0);
      var errors = [];

      var i = 0
      for (let item of journalEntries) {
        i++;
        console.log("Syncing item " + i + " of " + journalEntries.length);
        
        // Lookup account ref
        var qboAcctRef = null;
        var qboAccountName = item.descrip.trim();
        var qboAccountNumber = item.acct;

        
        /* 
         * - Change any entry going to the Net Income account to Retained Earnings.
         * - Change any entry going to the Accounts Payable account to a temporary 
         *       A/P account that we will clear out later.
         * - Change any entry going to the Accounts Receivable account to a temporary 
         *       A/R account that we will clear out later.
         */
        if (qboAccountName === 'Net Income') {
          qboAccountName = 'Retained Earnings';
          qboAccountNumber = '0003100';
        } else if (qboAccountName === 'Accounts Payable') {
          qboAccountName = 'Accounts Payable Liability';
          qboAccountNumber = '0002001';
        } else if (qboAccountName === 'Accounts Receivable') {
          qboAccountName = 'Accounts Receivable Asset';
          qboAccountNumber = '0001051';
        }


        await getQboAccount(qboAccountName, qboAccountNumber, qboAuth)
          .then(qboAccount => {
            console.log("Found existing: ");
            qboAcctRef = { value: qboAccount.Id };
          })
          .catch(err => { 
            errors.push("No QBO Account: "+qboAccountName);
            console.error('Error in getQboAccount for:'+item.descrip.trim());
          });


        var amount = new Number(item.periodBalance);
        total += amount;
        var je = {
          Id: (new Number(i-1)).toString()
          , Description: "Historical data load.  Period: " + getMonth(filter.period) + " " + filter.year
          , Amount: Math.abs(amount).toFixed(2)
          , DetailType: "JournalEntryLineDetail"
          , JournalEntryLineDetail: {
            PostingType: (amount < 0)?"Credit":"Debit",
            AccountRef: qboAcctRef
          }
        };

        journalEntry.Line.push(je);

      }
      console.log("Lookup Errors "+JSON.stringify(errors));
      if (errors.length > 0) {
        notify("error", "Errors in Account Lookup: "+JSON.stringify(errors));
      }
      else {

        await createQboJournalEntry(journalEntry, qboAuth)
          .then(newJounralEntry => {
            notify('success', 'Created: '+newJounralEntry.Description)
          })
          .catch(async err => {
            console.error('Error in createQboJournalEntry - It may exist already.  Try to load it from QB... ');
          });
      }

      console.log("Journal Entry > "+JSON.stringify(journalEntry));
      console.log("Period Total: $"+total.toFixed(2));
      notify("success", journalEntries.length + " Transactions - Period Total: $"+total.toFixed(2));
    })
    .catch((err) => {
      console.log(JSON.stringify(err));

    });
}

function getMonth(i) { 
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[i-1];
}

export function createQboJournalEntry(journalEntry, qboAuth) {
  console.log('createQboAccount:'+JSON.stringify(journalEntry));

  
  const token = qboAuth.accessToken
  const realmId = qboAuth.realmId
  var url = `${baseUrl}v3/company/${realmId}/journalentry`;

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
    , data: journalEntry
    , responseType: 'json'
  };

  return new Promise(function(resolve, reject) {
    setTimeout(async () => {
      await axios(config)
      .then((response) => {
        console.debug('newJournalEntry: '+JSON.stringify(response));
        var newJournalEntry = response.data.JournalEntry;
        
        resolve(newJournalEntry);
      })
      .catch((err) => {
        //console.error(JSON.stringify(err));
        var msg = "Error Creating New QBO JournalEntry: " + JSON.stringify(err) ;
        console.error(msg);
        reject(msg);
      });
    }, throttleTimeout);
  });
}

export function getSourceJournalEntryData(filter) {

  return new Promise(function(resolve, reject) {

    const resourceUrl = `${BASE_URL}/acct/parse-entries`;
    var filterUrl = (filter && filter.year)?`/${filter.year}`:'';
        filterUrl += (filter && filter.period)?`/${filter.period}`:'';
    const url = resourceUrl+filterUrl;
    
    const config = { 
      headers: contentHeaders 
      , method: 'get'
      , url: url
      , responseType: 'json'
    };

    console.log("About http post to url:" + url);
    
    axios(config)
      .then((response) => {
        console.debug("response: "+JSON.stringify(response));
        var journalEntries = response.data;
        resolve(journalEntries);
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        reject(err);
      });

  });
}