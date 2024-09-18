import React from 'react'
import './RelatedProduct.css'
import { Item } from '../Items/Items'
import data_product from '../Assets/data'

export const RelatedProduct = () => {
  return (
    <div className='relatedproducts'>
        <h1>You May Also Like</h1>
        <hr/>
        <div className="relatedproducts-item">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}  />
            })}
        </div>
    </div>
  )
}
