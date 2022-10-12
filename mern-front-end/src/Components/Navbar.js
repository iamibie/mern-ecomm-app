import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {NavDropdown, Nav} from 'react-bootstrap'
import {logout} from '../actions/userActions'
import {LinkContainer} from 'react-router-bootstrap'



const Navbar = (props) => {
    const {totalItems} = props;
    return (
        <div>
            <Navtop totalItems={totalItems}/>
            <NavBottom/>
        </div>
    )
}

export default Navbar

export const Navtop = (props) => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const {totalItems} = props;

    const logoutHandler = () => {
       dispatch(logout())
    }


    return (
        <div className="nav-top-container">
            <div className='logo-img'>
                   <img src="/img/mainlogo.png" alt="she got it all logo"/>
            </div>

           <div className="H-A-B">
                <ul>
                   <div className="bag-img">
                      <Link to='/cart' style={{ textDecoration: 'none' }}>
                           <img  src="img/shopping-bag.png" alt=""/> {totalItems}
                      </Link>
                  </div>
                      <Link to='/'  style={{ textDecoration: 'none' }}>
                          <li>HOME</li>
                      </Link>
                      <li>ABOUT</li>

                       {userInfo ? 
                          (<NavDropdown title={userInfo.name} id='username'>
                              <LinkContainer to='/profile'>
                                 <NavDropdown.Item>Profile</NavDropdown.Item>
                              </LinkContainer>
                              <NavDropdown.Item onClick={logoutHandler}>
                                  Logout
                              </NavDropdown.Item>
                          </NavDropdown>) : (<LinkContainer to='/login'  style={{ textDecoration: 'none' }}>
                              <Nav.Link><li>LOGIN</li></Nav.Link>
                         </LinkContainer>)}

                          {userInfo && userInfo.isAdmin &&
                              (<NavDropdown title={userInfo.isAdmin} id='adminmenu'>
                                  <LinkContainer to='/admin/users'>
                                      <NavDropdown.Item>Users</NavDropdown.Item>
                                  </LinkContainer>

                                  <LinkContainer to='/admin/products'>
                                      <NavDropdown.Item>Products</NavDropdown.Item>
                                  </LinkContainer>
      
                                  <LinkContainer to='/admin/orders'>
                                      <NavDropdown.Item>Orders</NavDropdown.Item>
                                  </LinkContainer>   
                             </NavDropdown>
                        )}
                          
                        
                </ul> 
        
                <div className="hamburger-menu">
                       <a href="#"><img src="img/hamburger-menu.png" alt=""/></a>
                </div>
           </div>
        </div>
    );
}

export const NavBottom = () => {
    return (
        <div className="nav-categories-div nav-bottom-container">
            <ul>
                <Link to="/eyes" style={{ textDecoration: 'none' }}>
                  <li>EYES</li>
                </Link>
                <Link to="/lips" style={{ textDecoration: 'none' }}>
                  <li>LIPS</li>
                </Link>
                <Link to="/face" style={{ textDecoration: 'none' }}>
                  <li>FACE</li>
                </Link>
                <Link to="/tools-brushes" style={{ textDecoration: 'none' }}>
                  <li>TOOLS/BRUSHES</li>
                </Link>
            </ul>
        </div>
    )
}