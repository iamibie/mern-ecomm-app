import React from 'react'
import './App.css'
import Header from './Components/Header'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Productscreen from './screens/Productscreen';
import cartScreen from './screens/cartScreen'
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import Navbar from './Components/Navbar';
import orderDetailsScreen from './screens/orderDetailsScreen';
import UserListScreen from './screens/UserListScreen';
import AdminUpdateUserScreen from './screens/AdminUpdateUserScreen';
import ProductListScreen from './screens/ProductListScreen';
import AdminUpdateProductScreen from './screens/AdminUpdateProductScreen'



const App = () => {
  return (


    <Router>
            <div className="App">
              <Navbar/>
               
                  <Switch>
                        <Route path='/order/:id' exact component={orderDetailsScreen}/>
                        <Route path='/user/:id/edit' exact component={AdminUpdateUserScreen}/>
                        <Route path='/login' exact component={LoginScreen}/>
                        <Route path='/admin/users' exact component={UserListScreen}/>
                        <Route path='/shipping' exact component={ShippingScreen}/>
                        <Route path='/payment' exact component={PaymentScreen}/>
                        <Route path='/placeorder' exact component={PlaceOrderScreen}/>
                        <Route path='/register' exact component={RegisterScreen}/>
                        <Route path='/profile' exact component={ProfileScreen}/>
                        <Route path='/' exact component={Header}/>
                        <Route path='/product/:id' component={Productscreen}/>
                        <Route path='/admin/products' component={ProductListScreen}/>
                        <Route path='/products/:id/edit' component={AdminUpdateProductScreen}/>
                        <Route path='/cart/:id?' component={cartScreen}/>
                   </Switch>
                   
        
            </div>
        </Router>
  
  )
}

export default App

