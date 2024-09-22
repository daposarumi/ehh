import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import { Item } from '../Components/Items/Items';

export const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  const [sortCriteria, setSortCriteria] = useState('default');

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedProducts = [...all_products]
    .filter(item => props.category === item.category)
    .sort((a, b) => {
      switch (sortCriteria) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className='shop-category'>
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-{sortedProducts.length}</span> out of {all_products.filter(item => props.category === item.category).length}
        </p>
        <div className="shopcategory-sort">
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        ))}
      </div>
    </div>
  );
};
