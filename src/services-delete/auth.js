import axios from 'axios'
import {BASE_URL} from './config'
import { Observable } from 'rx-lite'
import { contentHeaders } from '../services/config'

//import { connect } from 'react-redux'

function doLogin(username: string, password: string) {
    
    console.debug("doLogin: " + username + " / " +  password);
    const authUrl = `${BASE_URL}/auth`;

    const body = { username: username, password: password};
    var config = { headers: contentHeaders };

    return axios.post(authUrl, body, config);
      // .then((response) => {
          
      //     console.log("response: "+JSON.stringify(response));
          
      //     var responseObj = response.data;
      //     //let success: boolean = responseObj.success;
      //     var token = responseObj.token;
          
      //     console.log("Body: "+JSON.stringify(responseObj));
      //     console.log("Success: "+responseObj.success);
      //     console.log("Message: "+responseObj.message);
      //     console.log("Token: "+responseObj.token);
          
      //     if (token) {
      //       localStorage.setItem('plaz4Token', token);
      //       localStorage.setItem('plaz4User', username);
      //     }

      //     //this.plaz4Authenticated = success;
      //     //this.emitAuthStatus(this.plaz4Authenticated);
      //     //this.announceAuthStatus(responseObj.message);

      //     console.log("Plaz4 Authenticated: " + this.plaz4Authenticated);
          
      //     return Observable.create(responseObj);
      //   });
}

  // function doLogout() {
  //   console.log("doLogout");
  //   this.plaz4Authenticated = false;
  //   this.expiresTimerId = null;
  //   this.plaz4Expires = 0;
  //   this.boxAccessToken = null;
  //   this.emitAuthStatus(true);
  //   this.announceAuthStatus("LoggedOut");
  //   this.router.navigate(['home']);
  //   console.log('Plaz4Session has been cleared');
  // }

  // function checkSession() {
    
  //   console.debug("checkSession");
    
  //   // Get the token and build headers
  //   let token = localStorage.getItem('plaz4Token');
  //   let user = localStorage.getItem('plaz4User');
  //   let headers = new Headers({
  //     "Authorization": token
  //   });
  //   console.log("headers: "+ headers);

  //   // Create options obj for call and 
  //   let options = new RequestOptions({ headers: headers });
    
  //   let checkSessionUrl: string = this.getBaseApiUrl()+"/session";
    
  //   return axios.get(checkSessionUrl, options)
  //     .map((response) => { 
  //       console.log("response: "+response.json()); 
        
  //       var responseObj = response.json();
  //       let success: boolean = responseObj.success;
  //       var message = responseObj.message;
          
  //       this.plaz4Authenticated = success;
  //       this.emitAuthStatus(this.plaz4Authenticated);
  //       this.announceAuthStatus(message);
          

  //       return responseObj; 
  //     })
  //     .catch(this.handleError);
  // }

export {doLogin};