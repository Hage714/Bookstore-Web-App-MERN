import React, { useEffect, useState, useContext} from "react";
import { BASE_URL} from "../../../utils/config";
import AuthContext from "../../../context/AuthContext";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const { token } = useContext(AuthContext);


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(items);
    },[]);

    const handleIncreaseQuantity = (id) => {
        const items = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem("cartItems", JSON.stringify(items));
        setCartItems(items); // Update the state
    };

    const handleDecreaseQuantity = (id) => {
        const items = cartItems.map((item) =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        localStorage.setItem("cartItems", JSON.stringify(items));
        setCartItems(items); // Update the state
    };

    const handleRemoveItem = (id) => {
        const items = cartItems.filter((item) => item.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(items));
        setCartItems(items); // Update the state
    };
    const getTotalPrice = () => {
        return cartItems
            .reduce((total, item) => total + item.quantity * item.price, 0) //increasing quantity and price
            .toFixed(2);
    };

    const placeOrder = async () => {
        const total_cost = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        const orderData = {
            items: cartItems,
            totalCost: total_cost,
            orderStatus: "PENDING"
        }

        const response = await fetch (`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(orderData)
        })

        if(response.ok) {
            console.log("Order placed successfully!");
            localStorage.removeItem('cartItems');
            window.location.reload("my-account");
         } else {
             console.log("Failed to place order!");
         }
        console.log(orderData)
    }
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Shopping Cart</h1>
            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => handleDecreaseQuantity(item.id)}
                                                >
                                                    -</button>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control text-center"
                                                value={item.quantity}
                                                readOnly
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => handleIncreaseQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.quantity * item.price)}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Summary</h5>
                            <p className="card-text">Total: ${getTotalPrice()}</p>
                            <button className="btn btn-primary btn-block" onClick={placeOrder}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
