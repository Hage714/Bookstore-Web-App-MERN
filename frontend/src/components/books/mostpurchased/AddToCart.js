import React, { useState } from 'react'

const AddToCart = ({ onAddToCart }) => {
    const [quantity, setQuantity] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddToCart(quantity);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
               <input type='text' name='productName' className='form-control' hidden />
            </div>
            <div className='mb-2 d-flex align-items-center'>
                <label className='form-label fs-5 fw-semibold m-3'>Quantity:</label>
                <input type='number' name='quantity' className='form-control' value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min='1' />
            </div>
            <div className='text-center'>
                <button type='submit' className='btn btn-dark btn-sm'>Submit</button>
            </div>
        </form>
    )
}

export default AddToCart