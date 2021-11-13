import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import Button from "./LogButton";


function Header(props) {

   function logout() {
      fetch("/logout").then(() => {
         props.onLogout();
      });
   }

   return (
      <header className='header'>
         <Link className='logo' className='active' to='/'>Home </Link>
         <div className='header-right'>
            <Link to='/streets' >Streets </Link>
            <Link to='/streets/add' >Add street </Link>
            <Link to='/districts' >Districts </Link>
            <Link to='/districts/add' >Add district </Link>
            <Button onLogout={logout}/>
         </div>
      </header>
   );


}

export default Header;