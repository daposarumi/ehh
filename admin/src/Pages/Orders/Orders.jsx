// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios'

const handleDownload = () => {
    axios({
      url: 'https://panache-backend.onrender.com/api/download-subscribers', // API endpoint to download the file
      method: 'GET',
      responseType: 'blob', // Important: Handle the response as a binary blob
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'subscribers.xlsx'); // Filename for the downloaded file
      document.body.appendChild(link);
      link.click();
    }).catch((error) => {
      console.error('Error downloading the file:', error);
    });
  };

// eslint-disable-next-line react/prop-types
const Orders = ({url}) => {

    const [orders,setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url+"/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
        }
            else{
                toast.error("Error")
            }
        }

        const statusHandler = async (event,orderId) => {
                const response = await axios.post(url+"/api/order/status",{
                    orderId,
                    status:event.target.value
                })
                if (response.success) {
                    await fetchAllOrders
                }
        }

        useEffect(()=>{
            fetchAllOrders();
        })
  return (
    <div className='order add'>
        <h3>Orders</h3>
        <div className="order-list">
            {orders.map((order,index)=>(
                <div key={index} className="order-item">
                    <div>
                    <p className='order-item-dress'>
                        {order.items.map((item,index)=>{
                        if (index===order.items.length-1) {
                            return item.name + " x " + item.quantity
                        }
                        else{
                            return item.name + " x " + item.quantity + ", "
                        }
                    })}
                    </p>
                    <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                    <div className="order-item-address">
                        <p>{order.address.street+","}</p>
                        <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                    </div>
                    <p className="order-item-phone">{order.address.phone}</p>
                    </div>
                    <p>Items: {order.items.length}</p>
                    <p>&#8358;{order.amount}</p>
                    <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                        <option value="Order Processing">Order Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            ))}
        </div>
        <button onClick={handleDownload} className='download-button'>
      Download Subscribers List
    </button>
    </div>




  
 
  )
}

export default Orders