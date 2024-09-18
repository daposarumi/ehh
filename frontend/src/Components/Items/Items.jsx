import React from 'react'
import './Items.css'
import { Link } from 'react-router-dom'

export const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img src={props.image} onClick={window.scrollTo(0,0)} alt="product"/></Link>
      <p>{props.name}</p>

        <div className='item-price'>
        &#8358;{props.price.toLocaleString()}
        </div>
    </div>
  )
}
