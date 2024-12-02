import React, {useContext} from 'react'
import {Context} from '../../index.js'
import {Link} from "react-router-dom";
// import {FaFacebookF, FaYoutube, FaLinkdin} from 'react-icons/fa'
// import {RiInstagramFill} from 'react-icons/ri'



const Footer = () => {
  const {isAuthorized}=useContext(Context);

  return (
    <footer className={isAuthorized ?"footerShow":"footerHide"}>
    <div>&copy; All right are reserved </div>

    <div>
      {/* <Link to={"/"} target="_blank"><FaFacebookF/></Link> */}
      {/* <Link to={"/"} target="_blank"><FaYoutube/></Link> */}
      {/* <Link to={"/"} target="_blank"><FaLinkdin/></Link> */}
      <Link to={"/"} target="_blank"></Link>

    </div>
</footer>)}
      


export default Footer
