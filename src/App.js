  import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';
import { LoginPage, SignupPage, Dashboard } from './components';
import { alertActions } from './actions';

class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
     history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
            console.log("in app constructor clearing history")
        });
  }
  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <Router history={history}>
          <div>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </Router>              
      </div>       
    );
  }
}


function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

/*
function mapStateToProps(state){
  const {username, password} = state;
}
*/

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 

