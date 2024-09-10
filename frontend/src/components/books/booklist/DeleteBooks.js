import React, { useEffect, useContext } from 'react'
import { BASE_URL } from '../../../utils/config';
import AuthContext from '../../../context/AuthContext';

const DeleteBooks = ({ id }) => {
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const getBook = async () => {
            const response = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const data = await response.json();
            console.log(data);
        }
        if (id) {
            getBook();
        }

    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const deleteBook = async () => {
            const response = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify()
            });
            if (response.ok) {
                alert("Book deleted successfully!");
                window.location.reload();
            }
            else {
                alert("Failed to delete book!");
            }
        }
        deleteBook();
    }

    return (
        <div class="modal fade" id="deleteBooksModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Book</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <p>Are you sure you want to delete the book?</p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit} type="submit" class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteBooks

