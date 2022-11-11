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
import orderDetailsScreen from './screens/OrderDetailsScreen';
import UserListScreen from './screens/UserListScreen';
import AdminUpdateUserScreen from './screens/AdminUpdateUserScreen';
import ProductListScreen from './screens/ProductListScreen';
import AdminUpdateProductScreen from './screens/AdminUpdateProductScreen'
import OrderListScreen from './screens/OrderListScreen';
import Footer from './Components/Footer';
import MainScreen from './screens/MainScreen';



const App = () => {
  return (


    <Router>
            <div className="App">
              <Navbar/>
             
               
                  <Switch>
                        <Route path='/' exact component={MainScreen}/>
                        <Route path='/order/:id' exact component={orderDetailsScreen}/>
                        <Route path='/user/:id/edit' exact component={AdminUpdateUserScreen}/>
                        <Route path='/login' exact component={LoginScreen}/>
                        <Route path='/admin/users' exact component={UserListScreen}/>
                        <Route path='/admin/orders' exact component={OrderListScreen}/>
                        <Route path='/shipping' exact component={ShippingScreen}/>
                        <Route path='/payment' exact component={PaymentScreen}/>
                        <Route path='/placeorder' exact component={PlaceOrderScreen}/>
                        <Route path='/register' exact component={RegisterScreen}/>
                        <Route path='/profile' exact component={ProfileScreen}/>
                        <Route path='/product/:id' component={Productscreen}/>
                        <Route path='/admin/products' component={ProductListScreen}/>
                        <Route path='/products/:id/edit' component={AdminUpdateProductScreen}/>
                        <Route path='/cart/:id?' component={cartScreen}/>
                   </Switch>

                   <Footer/>
                   
        
            </div>
        </Router>
  
  )
}

export default App

