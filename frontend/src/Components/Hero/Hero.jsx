import React from 'react'
import './Hero.css'


// import shalewa from "../Assets/shalewa.jpg"

export const Hero = () => {

  const scrollToBorokinni = () => {
    const borokinniSection = document.getElementById('borokinni');
    if (borokinniSection) {
      borokinniSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (

    <div class="row">
            <div class="col-lg-6 top">
                <h1>The<br/> Bọ̀rọ̀kínní Collection</h1>
                <p>an exquisite fusion of trendsetting designs, premium fabrics, <br class="mobilebreak"/>and timeless elegance</p>
               <button onClick={scrollToBorokinni} type="button" class="btn btn-primary">SHOP HERE</button>
            </div>
            <div class="col-lg-6 topimage">
                {/* <img src={shalewa} alt="model dressed in pbf" class="hero"/> */}
            </div>
        </div>

  )
}




