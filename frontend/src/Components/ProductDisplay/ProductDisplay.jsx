import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';


export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    
    const [selectedSize, setSelectedSize] = useState('');
    const [showMessage, setShowMessage] = useState(false); // State for showing the message

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to the cart.");
        } else {
            addToCart(product.id, selectedSize);
            setShowMessage(true); // Show the message
            setTimeout(() => {
                setShowMessage(false); // Hide the message after 2 seconds
            }, 2000);
        }
    };

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
                   {product.description}
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

                {/* Added to Cart Message */}
                {showMessage && (
                    <div className="added-to-cart-message">
                        Added to cart!
                    </div>
                )}
            </div>
        </div>
    );
};
