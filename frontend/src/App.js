import React from 'react'
import './App.css'
import Header from './Components/Header'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Productscreen from './screens/ProductDetail';
import cartScreen from './screens/Cart'
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/SignUp';
import ProfileScreen from './screens/UserProfile';
import ShippingScreen from './screens/ShippingAddress';
import PaymentScreen from './screens/PaymentMethod';
import PlaceOrderScreen from './screens/PlaceOrder';
import Navbar from './Components/Navbar';
import orderDetailsScreen from './screens/OrderSummary';
import UserListScreen from './screens/Users';
import AdminUpdateUserScreen from './screens/EditUser';
import ProductListScreen from './screens/Products';
import AdminUpdateProductScreen from './screens/EditProduct'
import OrderListScreen from './screens/Orders';
import Footer from './Components/Footer';
import MainScreen from './screens/Main';



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

