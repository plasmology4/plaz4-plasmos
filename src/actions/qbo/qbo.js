import axios from 'axios'
import { errorCallingApi, createWindow, notify } from '../utils'
import base64 from 'base-64'

/*
 * For Development mode, add the following URLs to the intercept 
 * pattern area of the chrome CORS extension.  This will add the 
 * header to the response that is required to make the API calls 
 * work from localhost.
 *
 *  https://oauth.platform.intuit.com/*
 *  https://sandbox-quickbooks.api.intuit.com/* 
 * 
 */

export const baseUrl = 'https://sandbox-quickbooks.api.intuit.com/';
// export const baseUrl = 'https://quickbooks.api.intuit.com/';

//const callbackURL = 'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl';
const authURL = 'https://appcenter.intuit.com/connect/oauth2';
const accessTokenURL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
const revokeTokenURL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/revoke';
const clientId = 'Q0GDRSsbMBTOroGth4Rwiwbr4I4a74GeE4p1BpLleq0opkDR8h';
const clientSecret = 'CeHEA8l3L6FPRw4FcRjohoFFpSWGUZ2zmvPHy6Po';
const scope = 'com.intuit.quickbooks.accounting';
const state = 'security_token';
const redirectUrl = 'http://localhost:3000/oauth2/redirectUrl';

export function qboAuthStatus(qboAuth) {
  return {
    type: 'QBO_AUTH',
    qboAuth: qboAuth
  };
}

export function executeQboAuthRequest() {

  var windowHandle;
  var intervalId;
  var loopCount = 600;
  var intervalLength = 100;
  var code, stateReceived, realmId;

  const qboAuthUrl = `${authURL}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUrl}&response_type=code&state=${state}`;
  
  return (dispatch) => {
    console.log("this.qboAuthUrl: "+qboAuthUrl);
    windowHandle = createWindow(qboAuthUrl, 'OAuth2 Login');
    intervalId = setInterval(() => {
      if (loopCount-- < 0) {
        clearInterval(intervalId);
        //emitAuthStatus(false);
        windowHandle.close();
      } else {
        var href;
        try {
          href = windowHandle.location.href;
          console.log("href is:" + href);
        } catch (e) {
          console.error('Error:', e);
        }
        if (href != null) {
          var re = /code=(.*)/;
          var found = href.match(re);

          console.log("found=" + found);
          if (found) {
            console.log("Callback URL:", href);
            clearInterval(intervalId);
            //console.log("hrefquerystring:", href.substr(redirectUrl.length + 1));
            

            var parsed = parse(href.substr(redirectUrl.length + 1));
            //var expiresSeconds = Number(parsed.expires_in) || 1800;
            console.log("parsed:", parsed);
            code = parsed.code;
            stateReceived = parsed.state;
            realmId = parsed.realmId;

            console.log("code=" + code);
            console.log("state=" + stateReceived);
            console.log("realmId=" + realmId);

            if (code) {
              // We have the code - so we have authenticated the credentials
              
              const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUrl}`;
              const accessTokenUri = accessTokenURL;// + '?' + body

              const headers = { 
                Accept: 'application/json'
                , Authorization: 'Basic ' + base64.encode(clientId + ":" + clientSecret)
                //, Authorization: 'Basic UTBHRFJTc2JNQlRPcm9HdGg0Undpd2JyNEk0YTc0R2VFNHAxQnBMbGVxMG9wa0RSOGg6Q2VIRUE4bDNMNkZQUnc0RmNSam9ob0ZGcFNXR1VaMnptdlBIeTZQbw=='
                , 'Content-Type': 'application/x-www-form-urlencoded'
                //, Host: 'oauth.platform.intuit.com'
              };

              console.log("About http post to url:" + accessTokenUri);
              console.log("headers:" + JSON.stringify(headers));
              console.log("body:" + body);

              var config = {
                url: accessTokenURL
                , method: 'post'
                , headers: headers
                , data: body
                , responseType: 'json'
              };

              axios(config)
                .then((response) => {
                  console.log("token response: "+JSON.stringify(response));
                  var qboAuthData = processAccessToken(response.data, realmId);
                  console.log("qboAuthData: "+JSON.stringify(qboAuthData));
                  dispatch(qboAuthStatus(qboAuthData));
                })
                .catch((err) => {
                  console.error("Error requesting refresh token: "+JSON.stringify(err));
                  var qboAuthData = {
                    authorized: 'false'
                    , accessToken: null
                    , accessExpirationDate: null
                    , refreshToken: null
                    , refreshExpirationDate: null
                    , message: err
                  };
                  dispatch(qboAuthStatus(qboAuthData));
                  dispatch(errorCallingApi("Error calling API: " + accessTokenURL + " " + err))
                });
            }

            windowHandle.close();
          }
        }
      }
    }, intervalLength);
  };
}

function parse(str) { // lifted from https://github.com/sindresorhus/query-string
  if (typeof str !== 'string') {
    return {};
  }

  str = str.trim().replace(/^(\?|#|&)/, '');

  if (!str) {
    return {};
  }

  return str.split('&').reduce(function (ret: any, param:string) {
    var parts = param.replace(/\+/g, ' ').split('=');
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : undefined;

    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }

    return ret;
  }, {});
}

function processAccessToken(data, realmId){
  console.log("processAccessToken");
  console.log("access token:" + data.access_token);
  console.log("refresh token:" + data.refresh_token);
  console.log("realmId:" + realmId);
  console.log("expires in seconds:" + data.expires_in);

  // Expiration
  //startExpiresTimer(body.expires_in);
  var currentTime = new Date();
  var accessExpirationMillis = currentTime.getTime() + (data.expires_in * 1000);
  let accessExpirationDate = new Date();
  accessExpirationDate.setTime(accessExpirationMillis);
  var accessExpirationDateStr = accessExpirationDate.toString();

  var refreshExpirationMillis = currentTime.getTime() + (data.x_refresh_token_expires_in * 1000);
  let refreshExpirationDate = new Date();
  refreshExpirationDate.setTime(refreshExpirationMillis);
  var refreshExpirationDateStr = refreshExpirationDate.toString();

  var qboAuthData = {
    authorized: 'true'
    , accessToken: data.access_token
    , accessExpirationDate: accessExpirationDateStr
    , refreshToken: data.refresh_token
    , refreshExpirationDate: refreshExpirationDateStr
    , realmId: realmId
    , message: 'Authorization successful'
  };

  return qboAuthData;

}

export function getCompanyInfo() {
  console.log('getCompanyInfo:');

  return (dispatch, getState) => {
  
  const token = getState().qboAuth.accessToken
  const realmId = getState().qboAuth.realmId

  const url = `${baseUrl}v3/company/${realmId}/companyinfo/${realmId}`;
  
  const headers = {
    Accept: 'application/json'
    , Authorization: 'Bearer ' + token
    , 'Content-Type': 'application/json'
  }

  console.log("About http post to url:" + url);
  console.log("headers:" + JSON.stringify(headers));
  
  var config = {
    url: url
    , method: 'get'
    , headers: headers
    //, data: body
    , responseType: 'json'
  };

  axios(config)
    .then((response) => {
      console.log("company info response: "+JSON.stringify(response));
      var info = response.data.CompanyInfo.CompanyName;
      notify("info", info);
    })
    .catch((err) => {
      console.error("Error posting to: " + url + " " + JSON.stringify(err));
      notify("error", JSON.stringify(err));
      dispatch(errorCallingApi("Error calling API: " + err))
    });
  }
}

export function checkAccessToken() {
  
  // Check the expiration date of access token???
  console.log('checkAccessToken:');

  return (dispatch, getState) => {

    const refreshToken = getState().qboAuth.refreshToken;
    const realmId = getState().qboAuth.realmId;
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    const accessTokenUri = accessTokenURL;// + '?' + body

    const headers = { 
      Accept: 'application/json'
      , Authorization: 'Basic ' + base64.encode(clientId + ":" + clientSecret)
      , 'Content-Type': 'application/x-www-form-urlencoded'
    };

    console.log("About http post to url:" + accessTokenUri);
    console.log("headers:" + JSON.stringify(headers));
    console.log("body:" + body);

    var config = {
      url: accessTokenURL
      , method: 'post'
      , headers: headers
      , data: body
      , responseType: 'json'
    };

    axios(config)
      .then((response) => {
        console.log("refresh token response: "+JSON.stringify(response));
        var qboAuthData = processAccessToken(response.data, realmId);
        console.log("qboAuthData: "+JSON.stringify(qboAuthData));
        notify("Refreshed Token.  New Token Expires: ", qboAuthData.accessExpirationDate);
        dispatch(qboAuthStatus(qboAuthData));
      })
      .catch((err) => {
        console.error("Error posting to: " + accessTokenURL + " " + JSON.stringify(err));
        notify("error", JSON.stringify(err));
        dispatch(errorCallingApi("Error calling API: " + err))
      });
  }
}

export function revokeAccessToken() {
  
  // Check the expiration date of access token???
  console.log('revokeAccessToken:');

  return (dispatch, getState) => {

    const refreshToken = getState().qboAuth.refreshToken;
    const accessToken = getState().qboAuth.accessToken;
    const realmId = getState().qboAuth.realmId;
    const body = `access_token=${accessToken}&refresh_token=${refreshToken}`;
    //const body = {token: accessToken};
    const url = revokeTokenURL;

    const headers = { 
      Accept: 'application/json'
      , Authorization: 'Basic ' + base64.encode(clientId + ":" + clientSecret)
      , 'Content-Type': 'application/x-www-form-urlencoded'
    };

    console.log("About http post to url:" + url);
    console.log("headers:" + JSON.stringify(headers));
    console.log("body:" + body);

    var config = {
      url: url
      , method: 'post'
      , headers: headers
      , data: body
      , responseType: 'json'
    };

    axios(config)
      .then((response) => {
        console.log("refresh token response: "+JSON.stringify(response));
        var qboAuthData = processAccessToken(response.data, realmId);

        console.log("qboAuthData: "+JSON.stringify(qboAuthData));
        dispatch(qboAuthStatus(qboAuthData));


        notify("Refreshed Token.  New Token Expires: ", qboAuthData.accessExpirationDate);
      })
      .catch((err) => {
        console.error("Error posting to: " + url + " " + JSON.stringify(err));
        notify("error", "Token Revoke Failed: "+err.toString());
        dispatch(errorCallingApi("Error calling API: " + err))
      });
  }
}

// function startExpiresTimer(seconds: number) {
//     console.log("startExpiresTimer");
//     if (this.expiresTimerId != null) {
//       clearTimeout(this.expiresTimerId);
//     }
//     this.expiresTimerId = setTimeout(() => {
//       console.log('Session has expired');
//       this.doBoxLogout();
//     }, seconds * 1000); // seconds * 1000
//     console.log('Expires ', seconds, "seconds");
//     console.log('Token expiration timer set for', seconds, "seconds");
//   }

export function getRefreshToken() {

}



