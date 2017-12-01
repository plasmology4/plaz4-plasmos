import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store';

import Account from './components/account/Account'
import Login from './components/Login'
import Nav from './components/Nav'
import ProtectedRoute from './components/ProtectedRoute'
import News from './components/News'
import Events from './components/events/Events'
import Departments from './components/Departments'
import Test from './components/Test'
import Home from './components/Home.js'
import Admin from './components/admin/Admin'
import Control from './components/control/Control'
import Loader from './components/util/Loader'

import './assets/css/plaz4-style.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const store = configureStore(); // You can also pass in an initialState here



class App extends Component {
  
  render() {

    return (
        
        <Provider store={store}>
          <Router>
            <div className="App"  data-sticky-container >

              <Nav />
              <Loader />
              <ToastContainer 
                position="top-right"
                type="success"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
              />

              <Switch>
              
                <Route path="/news" component={News}/>
                <Route path="/events" component={Events}/>
                <Route path="/resources" component={Departments}/>
                <ProtectedRoute path="/protected" component={Test}/>
                <ProtectedRoute path="/account" component={Account}/>
                <ProtectedRoute path="/control" component={Control}/>
                <ProtectedRoute path="/admin" component={Admin}/>
                <Route path="/help" component={Test}/>
                <Route path="/login" component={Login}/>
                <Route path="/" component={Home}/>
                <Route path="/:user" component={Test}/>

              </Switch>

          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
