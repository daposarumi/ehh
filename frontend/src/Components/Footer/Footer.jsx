import React from 'react'
import './Footer.css'
import footerlogo from '../Assets/white logo.png'
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export const Footer = () => {

    const scrollToBorokinni = () => {
        const borokinniSection = document.getElementById('borokinni');
        if (borokinniSection) {
          borokinniSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
  return (
    <div className='footer'>
        <div className='footerlogo'>
            <img src={footerlogo} width="100" alt="logo"/>
        </div>
        <ul className='footer-links'>
            <li>About</li>
            {/* <li>Contact</li> */}
            <li onClick={scrollToBorokinni}>Products</li>
            <li><Link to="privacy-policy">Company</Link></li>
        </ul>
        <div className='footer-icons'>
            <div>
                <a href="https://www.instagram.com/panachebyfunmi?igsh=dHJ5NmR6ejc2NG84 "><FaInstagram style={{ fontSize: '1.2rem', color: 'white' }}/></a> 
            </div>
            <div>
                <a href="https://web.facebook.com/pinekitchen/about"><FaFacebook style={{ fontSize: '1.2rem', color: 'white' }}/></a>  
            </div>
            <div>
                <a href="https://wa.me/c/2349084574434"><FaWhatsapp style={{ fontSize: '1.2rem', color: 'white' }}/></a>  
            </div>      
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright &copy;2024, PBF - All Rights Reserved</p>
        </div>
    </div>
  )
}
