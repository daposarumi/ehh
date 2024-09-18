import React from 'react'
import './Hero.css'

// import shalewa from "../Assets/shalewa.jpg"

export const Hero = () => {
  return (

    <div class="row">
            <div class="col-lg-6 top">
                <h1>The<br/> Bọ̀rọ̀kínní Collection</h1>
                <p>an exquisite fusion of trendsetting designs, premium fabrics, <br class="mobilebreak"/>and timeless elegance</p>
                <a href="https://wa.me/c/2349084574434"><button type="button" class="btn btn-primary">SHOP HERE</button></a>
            </div>
            <div class="col-lg-6 topimage">
                {/* <img src={shalewa} alt="model dressed in pbf" class="hero"/> */}
            </div>
        </div>

  )
}

    /* <div className="flex flex-col md:flex-row gap-4">
    <div className="w-full md:w-1/2">
      <h1 className="heading text-4xl md:text-5xl font-bold pt-10 text-center md:text-left">
        The Bọ̀rọ̀kínní Collection
      </h1>
      <p className="text-lg md:text-xl mt-4 text-center md:text-left">
        an exquisite fusion of trendsetting designs, premium fabrics, and timeless elegance
      </p>
      <button className=" hero-button ml-40 bg-teal-500 hover:bg-transparent border border-teal-500 text-white hover:text-teal-500 font-semibold mt-9 py-4 px-14 rounded-full block mx-auto md:mx-0">
        SHOP NOW
      </button>
    </div>
    <div className="w-full md:w-1/2">
      <img src={shalewa} alt="hero" className="w-full h-auto" />
    </div>
  </div> */
  



