import React from 'react';
import Homescreen from '../screens/Homescreen';




const Header = () => {

    
      return (
        <>
           <HeaderItems/>
           <Homescreen/>
        </>
      )
  }

export default Header

export const HeaderItems = () => {
  return (
      <div className="header-items-container">
          <HeaderImage />
          <HeaderText />
          
      </div>
  )
}

 export const HeaderImage = () => {
  return (
      <div className="header-img-div two-columns">
         <img src="img/new-header-img-.png" alt="header image"/> 
      </div>
  )
}

const HeaderText = () => {
  return (
      <div className="header-text-btn-div two-column">
          <div className="header-text">
              <p><span>BEAUTY</span> <br/> doesn't have to be a compromise</p>
          </div>
          <div className="header-btn"><a href="#">Shop all Categories</a></div>
          
      </div>
  )
}