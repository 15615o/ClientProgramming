import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { Button, Table } from 'react-bootstrap';
import BookPage from '../BookPage';

const CartPage = () => {
    const uid = sessionStorage.getItem('uid');
    const [loading, setLoading] = useState(false);
    const db = getDatabase(app);
    const [books, setBooks] = useState([]);

    const getCart = () => {
        setLoading(true);
        onValue(ref(db, `cart/${uid}`), snapshot => {
            const rows = [];
            snapshot.forEach(row => {
                rows.push({key: row.key, ...row.val()});
            });
            setBooks(rows);
            setLoading(false);
        });
    };

    useEffect(() => {
        getCart();
    }, []);

    const onClickRemove = (book) => {
        if(window.confirm(`'Do you want to delete ${book.title}'?`)) {
            remove(ref(db, `cart/${uid}/${book.isbn}`));
        }
    };

    if(loading) return <h1 className='my-5 text-center'>Loading...</h1>

    return (
        <div>
            <h1 className='my-5 text-center'>Cart</h1>
            <Table>
                <thead>
                    <tr>
                        <td></td>
                        <td>Title</td>
                        <td>Add date</td>
                        <td>Detele</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => 
                        <tr key={book.isbn}>
                            <td width={50}><BookPage book={book}/></td>
                            <td>{book.title}</td>
                            <td>{book.date}</td>
                            <td>
                                <Button onClick={() => onClickRemove(book)}
                                    size='sm' variant='outline-danger'>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default CartPage
