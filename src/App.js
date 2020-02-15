import React, { Component } from 'react';
import NavBar from './components/misc/naviagtion';
import { Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import './components/resources/css/style.css'
import Login from './components/login';
import Home from './components/home';
import Dashboards from './components/dashboards/dashboards';
import DiseasePredictorDashboard from './components/dashboards/disease_predictor_dashboard';

class App extends Component {

  render() { 
    return ( 
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/dashboards/disease_predictor_dashboard" component={DiseasePredictorDashboard} />
          <Route path="/login" component={Login} />
          <Route path="/dashboards" component={Dashboards} />
          <Route path="/" exact component={Home} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;