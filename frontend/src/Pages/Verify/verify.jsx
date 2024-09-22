import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios'

export const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const { url } = useContext(ShopContext)
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            const response = await axios.post(url + "/api/order/verify", { success, orderId })
            if (response.data.success) {
                navigate("/myorders")
            } else {
                navigate("/")
            }
        }

        verifyPayment();
    }, [success, orderId, url, navigate]) 

    console.log(success, orderId);
    return (
        <div className='verify'>
            <div className='spinner'></div>
        </div>
    )
}
