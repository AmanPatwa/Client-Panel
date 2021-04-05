import React from 'react';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Auth from './components/helpers/Auth'
import Settings from './components/settings/Settings';
import firebase from 'firebase';

function App() {
  return (
    <Router>
    <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/'  component={Auth('/login')(Dashboard)}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/setting' component={Auth('/login')(Settings)}></Route>
            <Route exact path='/client/add'  component={Auth('/login')(AddClient)}></Route>
            <Route path='/client/edit/:id' component={Auth('/login')(EditClient)}></Route>
            <Route path='/client/:id' component={Auth('/login')(ClientDetails)}></Route>
          </Switch>
        </div>
        
    </div>
    </Router>
  );
}

export default App;
