import React, { useContext, useState } from 'react';
import './CartItems.css';
import { LoginSignup } from '../LoginSignup/LoginSignup';
import { ShopContext } from '../../Context/ShopContext';
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";



export const CartItems = () => {

   
      
    const { getTotalCartAmount, all_products, cartItems, removeFromCart, clearCart, addToCart } = useContext(ShopContext);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    // Ensure cartItems is defined before processing
    const processCartData = (cartData) => {
        if (!cartData) return {}; // Return empty object if cartItems is undefined or null
        return Object.keys(cartData).reduce((result, itemId) => {
            const itemSizes = cartData[itemId];
            if (!result[itemId]) result[itemId] = [];
            Object.keys(itemSizes).forEach(size => {
                const sizeInfo = itemSizes[size];
                if (sizeInfo && typeof sizeInfo === 'object' && sizeInfo.size && sizeInfo.quantity) {
                    result[itemId].push(sizeInfo);
                } else {
                    console.warn('Unexpected format for sizeInfo:', sizeInfo);
                }
            });
            return result;
        }, {});
    };

    const formattedCartItems = processCartData(cartItems);

    const handleCheckout = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setShowLogin(true);
        } else {
            navigate('/order');
        }
    };

    const handleNavigateToShop = () => {
        navigate('/'); 
    };

    const isCartEmpty = Object.keys(formattedCartItems).length === 0;

    return (
        <div className='cartitems'>
            {isCartEmpty ? (
                <div className="cart-empty">
                    <p class="py-4">Your cart is empty</p>
                    <button  onClick={handleNavigateToShop}>Go to Shop</button>
                </div>
            ) : (
                <>
                    <div className="cartitems-format-main">
                        <p>Products</p>
                        <p>Name</p>
                        <p>Size</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <hr />
                    {Object.keys(formattedCartItems).map((itemId) => {
                        const item = all_products.find((product) => product.id.toString() === itemId.toString());
                        if (item) {
                            const productSizes = formattedCartItems[item.id.toString()];
                            return productSizes.map(({ size, quantity }) => (
                                <div key={`${item.id}-${size}`}>
                                    <div className="cartitems-format cartitems-format-main">
                                        <img src={item.image} width='50' alt={item.name} className='carticon-producticon' />
                                        <p>{item.name}</p>
                                        <p>{size}</p>
                                        <p>&#8358;{item.price.toLocaleString()}</p>
                                        <div className='item-counter'>
                                            <button className='cartitems-quantity'>
                                                <AiOutlineMinus onClick={() => removeFromCart(item.id, size)} className='icon' />
                                                <span className='quantity'>{quantity}</span>
                                                <BsPlusLg onClick={() => addToCart(item.id, size)} className='icon' />
                                            </button>
                                        </div>
                                        <p>&#8358;{(item.price * quantity).toLocaleString()}</p>
                                        <TfiClose className='cartitems-remove-icon' onClick={() => clearCart(item.id, size)} />
                                        {/* <p className='cartitems-remove-text' onClick={() => clearCart(item.id, size)}>Remove</p> */}
                                    </div>
                                </div>
                            ));
                        }
                        return null;
                    })}
                    <div className="cartitems-down">
                        <div className="cartitems-total">
                            <h1>Cart Total</h1>
                            <div>
                                <div className="cartitems-total-item">
                                    <p>Subtotal</p>
                                    <p>&#8358;{getTotalCartAmount().toLocaleString()}</p>
                                </div>
                                <hr/>
                                <div className="cartitems-total-item">
                                    <p>Shipping Fee</p>
                                    <p>&#8358;{getTotalCartAmount() === 0 ? 0 : 6000}</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <p className='bold'>Total</p>
                                    <p className='bold'>&#8358;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6000}</p>
                                </div>
                            </div>
                            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                </>
            )}

            {showLogin && <LoginSignup setShowLogin={setShowLogin} />}
        </div>
    );
};
