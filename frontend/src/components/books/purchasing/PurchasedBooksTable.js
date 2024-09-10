import React, { useState } from 'react';
import dayjs from 'dayjs';

const PurchasedBooksTable = ({ booksPurchased }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className='booktable col-8'>
      <h3 className="text-center mb-3">Your Purchase History</h3>
      {isLoading && <p>Loading purchase history...</p>}
      {error && <p>Error fetching purchase history: {error}</p>}
      {booksPurchased.length > 0 ? (
        <table className="table table-md table-responsive table-bordered">
          <thead>
            <tr>
              <th>#</th>

              <th>Book Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {booksPurchased.map((purchase, index) => {
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{purchase.book?.title}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.price}</td>
                <td>{dayjs(purchase.purchaseDate).format("YYYY-MM-DD HH:mm:ss")}</td>
              </tr>
            }

            )}
          </tbody>
        </table>
      ) : (
        <p>You have no past purchases.</p>
      )}
    </div>
  )
}

export default PurchasedBooksTable
