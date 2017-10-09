  import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route } from 'react-router-dom';
import { history } from './helpers';
import { LoginPage, SignupPage, Dashboard } from './components';

class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
  }
  render() {
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

function mapStateToProps(state){
  const {username, password} = state;
}


export default App;
