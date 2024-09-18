import React from 'react'
import './Borokinni.css'
import borokinni from '../Assets/borokinni.js'
import { Item } from '../Items/Items'

export const Borokinni = () => {
  return (
    <div className='borokinni'>
        <h1>BOROKINNI</h1>
        <hr/>
        <div className='collections'>
            {borokinni.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
            })}
        </div>
    </div>
  )
}
