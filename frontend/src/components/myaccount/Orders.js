import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

import { BASE_URL } from '../../utils/config';

const Orders = () => {
    const token = Cookies.get('token');
    const { user } = jwtDecode(token);

    const [datePlaced, setDatePlaced] = useState(new Date());
    const [orderStatus, setOrderStatus] = useState(user.orderStatus);
    const [totalCost, setTotalCost] = useState(user.totalCost);


    const [orders, setOrders] = useState([]);

    useEffect(() => {

    const fetchOrdersData = async () => {
        const response = await fetch(`${BASE_URL}/orders/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        })

        if (response.ok) {
            console.log("Orders fetched successfully!");
            const data = await response.json();
            setOrders(data);
            console.log(data);
            //window.location.reload();
        } else {
            console.log("Something went wrong!");
        }
    }
    fetchOrdersData();
}, [0]);


    return (
        <div className="orders">
            <h2 className='text-center'>Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                         <th>Status</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{dayjs(order.datePlaced).format("YYYY-MM-DD HH:mm:ss")}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.totalCost}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
