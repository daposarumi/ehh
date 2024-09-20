import React from 'react';
import './RelatedProduct.css';
import { Item } from '../Items/Items';
import all_products from '../Assets/all_products';

export const RelatedProduct = ({ currentCategory, currentProductId }) => {
  const filteredProducts = all_products.filter(item => 
    item.category === currentCategory && item.id !== currentProductId // Exclude current product
  );

  return (
    <div className='relatedproducts'>
      <h1>You May Also Like</h1>
      <hr />
      <div className="relatedproducts-item">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};
