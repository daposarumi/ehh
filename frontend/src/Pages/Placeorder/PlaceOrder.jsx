import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './PlaceOrder.css';
import axios from 'axios';

export const PlaceOrder = () => {
  const { getTotalCartAmount, all_products, cartItems, url, token, userId } = useContext(ShopContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    // Debugging logs
    console.log('Cart Items:', cartItems);
    console.log('All Products:', all_products);
  
    let orderItems = [];

    if (cartItems && all_products && Array.isArray(all_products)) {
      all_products.forEach((item) => {
        // Access the ID from the product
        const itemId = item.id || item._id;
    
        // Check for the item in cartItems using itemId
        const cartItem = cartItems[itemId];
    
        if (cartItem && cartItem.length > 0) {
          // Extract size and quantity from the cartItem
          const { size, quantity } = cartItem[0]; // Since it's an array, access the first element
    
          // Ensure the quantity is greater than 0
          if (quantity > 0) {
            // Create a new object with the product and cart details
            let itemInfo = {
              ...item,
              itemId: itemId,
              quantity,
              size: size || 'Not Specified' // Add size
            };
            
            // Push the item into the final orderItems array
            orderItems.push(itemInfo);
            console.log('Added to orderItems:', itemInfo); // Log for confirmation
          }
        }
      });
    }
    
    console.log('Final Order Items:', orderItems); // To verify
    
    
  
    let subtotal = getTotalCartAmount();
    let deliveryFee = subtotal === 0 ? 0 : 6000;
    let totalAmount = (subtotal + deliveryFee) * 100; // Convert to kobo
  
    let orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: totalAmount,
    };
    
    console.log('Order Data:', orderData);
  
    try {
      const token = localStorage.getItem("token");
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      console.log("Order response:", response.data);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error.response ? error.response.data : error.message);
    }
  };
  

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cartitems-total">
          <h2 className='title'>Cart Total</h2>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>&#8358;{getTotalCartAmount()}</p>
            </div>
            <hr />
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
          <button className="cart-total" type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};
