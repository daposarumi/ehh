import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';


export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    
    // State for selected size
    const [selectedSize, setSelectedSize] = useState('');

    // Function to handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    }

    // Function to add to cart with selected size
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to the cart.");
        } else {
            addToCart(product.id, selectedSize);  // Pass product ID and selected size
        }
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img src={product.image} className='productdisplay-main-img' alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-prices">
                    <div className="price">&#8358;{product.price.toLocaleString()}</div>
                </div>
                <div className="productdisplay-right-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea officia, obcaecati iure culpa eveniet rem laboriosam tempore autem at excepturi odit dolorem eius eligendi doloribus dicta cumque perferendis! Blanditiis, aut.
                </div>

                {/* Size Selection */}
                <div className="productdisplay-right-size">
                    <h2>Select Size</h2>
                    <div className="productdisplay-right-sizes">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div
                                key={size}
                                onClick={() => handleSizeSelect(size)}
                                className={selectedSize === size ? 'selected-size' : ''}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button onClick={handleAddToCart}>ADD TO CART</button>
            </div>
            
        </div>
    );
}
