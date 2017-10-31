import axios from 'axios'
import { contentHeaders } from './config'
import { errorCallingApi, createWindow } from './utils'
import base64 from 'base-64'

export const baseUrl = 'https://sandbox-quickbooks.api.intuit.com/';
// export const baseUrl = 'https://quickbooks.api.intuit.com/';

const callbackURL = 'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl';
const authURL = 'https://appcenter.intuit.com/connect/oauth2';
const accessTokenURL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
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
  
  var authenticated;
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
              authenticated = true;

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
                    , refreshToken: null
                    , expirationDate: null
                    , message: err
                  };
                  //dispatch(qboAuthStatus(qboAuthData));
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
  var expirationMillis = currentTime.getTime() + (data.expires_in * 1000);
  let expirationDate = new Date();
  expirationDate.setTime(expirationMillis);
  var expirationDateStr = expirationDate.toString();

  var qboAuthData = {
    authorized: 'true'
    , accessToken: data.access_token
    , refreshToken: data.refresh_token
    , expirationDate: expirationDateStr
    , realmId: realmId
    , message: 'Authorization successful'
  };

  console.log("Expiration Milliseconds: " + expirationMillis);
  console.log("Expiration Date/Time: " + expirationDate.toString());

  return qboAuthData;

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



