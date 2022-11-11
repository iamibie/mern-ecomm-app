import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';





const Header = () => {

    
      return (
        <>
           <div className="main-header-div">
              <div className='left-header'>
                 <img src="/img/header-img-four.jpeg" alt="" />
              </div>
              <div className="right-header">
                <img src="/img/item-listed.png" alt="" />
                <LinkContainer to='/#homescreen'><Button type='submit' variant='primary'>Shop Now</Button></LinkContainer>
              </div>
           </div>
        </>
      )
  }

export default Header

