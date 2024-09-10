import React, { useState } from 'react';

const BorrowedBooksTable = ({booksBorrowed}) => { 

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
  return (
      <div className=' booktable col-8'>
          <h1>Your Borrowing History</h1>
          {isLoading && <p>Loading borrowing history...</p>}
          {error && <p>Error fetching borrowing history: {error}</p>}
          {booksBorrowed.length > 0 ? (
              <table className="table table-sm table-responsive table-bordered">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Book Title</th>
                          <th>Borrowed Date</th>
                          <th>Returned Date</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>

                      {booksBorrowed.map((borrow, index) => {
                          return <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{borrow.book?.title}</td>
                              <td>{new Date(borrow.borrowedDate).toLocaleDateString()}</td>
                              <td> {borrow.returnedDate ? (
                                  new Date(borrow.returnedDate).toLocaleDateString()
                              ) : (
                                  <p>Not Yet Returned</p>
                              )}</td>
                              <td>{borrow.returnedDate ? 'Returned' : 'Borrowed'}</td>
                          </tr>
                      }
                )}
                  </tbody>
              </table>

          ) : (
              <p>You have no past borrowings.</p>
          )}

      </div>
  )
}

export default BorrowedBooksTable
