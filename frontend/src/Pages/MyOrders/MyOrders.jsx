import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import './MyOrders.css';

// Component definition
const MyOrders = () => {
    const { url, token } = useContext(ShopContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [fetchOrders, token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((order, index) => {
                            const amountInNaira = order.amount / 100; // Convert Kobo to Naira
                            return (
                            <div key={index} className="my-orders-order">
                                <p>
                                    {order.items.map((item, idx) => (
                                        idx === order.items.length - 1
                                            ? `${item.name} (Size: ${item.size}) x ${item.quantity}`
                                            : `${item.name} (Size: ${item.size}) x ${item.quantity}, `
                                    ))}
                                </p>
                                <p className="order-amount">&#8358;{amountInNaira.toFixed(2)}</p>
                                <p className="order-items">Items: {order.items.length}</p>
                                <p className="order-status">
                                    <span>&#x25cf;</span><b>{order.status}</b>
                                </p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        );
                        })
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            )}
        </div>
    );
};


// Export statement at the bottom
export default MyOrders;

