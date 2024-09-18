import React from 'react'
import './Footer.css'
import footerlogo from '../Assets/white logo.png'
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className='footer'>
        <div className='footerlogo'>
            <img src={footerlogo} width="100" alt="logo"/>
        </div>
        <ul className='footer-links'>
            <li>About</li>
            <li>Contact</li>
            <li>Products</li>
            <li>Company</li>
        </ul>
        <div className='footer-icons'>
            <div >
                <FaInstagram style={{ fontSize: '1.2rem', color: 'white' }}/>    
            </div>
            <div>
                <FaFacebook style={{ fontSize: '1.2rem', color: 'white' }}/>    
            </div>
            <div>
                <FaWhatsapp style={{ fontSize: '1.2rem', color: 'white' }}/>    
            </div>      
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright &copy;2024, PBF - All Rights Reserved</p>
        </div>
    </div>
  )
}
