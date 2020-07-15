import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import NavBar from './components/misc/naviagtion';
import RegisterLogin from './components/register_login';
import Logout from './components/logout';
import Profile from './components/profile';
import Home from './components/home';
import Dashboards from './components/dashboards/dashboards';
import DiagnoseYourDisease from './components/dashboards/diagnoseYourDisease/diagnoseYourDisease';
import KnowYourHeart from './components/dashboards/knowYourHeart';
import SalesForecast from './components/dashboards/sales/salesForecasting';
import ProductSales from './components/dashboards/sales/productSales';
import BrandSales from './components/dashboards/sales/brandSales';
import CoronaStats from './components/dashboards/corona/coronaStats';
import Temp from './components/temp';

import 'react-toastify/dist/ReactToastify.min.css';
import './components/resources/css/style.css'
import './components/resources/js/helperScript'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = { }

  componentDidMount() {
    try {
      const userToken = localStorage.getItem('user-token')
      this.setState({ userToken })

    } catch(ex) { }
  }

  render() { 
    return ( 
      <React.Fragment>
        <ToastContainer autoClose={5000} />
        <NavBar userToken={this.state.userToken} />
        <div className='container'>
          <Switch>
            <Route path="/dashboards/salesForecast/products" component={ProductSales} />
            <Route path="/dashboards/salesForecast/brands" component={BrandSales} />
            <Route path="/dashboards/salesForecast" component={SalesForecast} />
            <Route path="/dashboards/diagnoseYourDisease" component={DiagnoseYourDisease} />
            <Route path="/dashboards/knowYourHeart" component={KnowYourHeart} />
            <Route path="/dashboards/corona/india" component={CoronaStats} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={RegisterLogin} />
            <Route path="/profile" component={Profile} />
            <Route path="/dashboards" component={Dashboards} />
            <Route path="/algoComparision" component={Temp} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;