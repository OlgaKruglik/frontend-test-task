import { useState, useEffect } from 'react';
import booksData from '../books.json';

const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        try {
            setBooks(booksData);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, []);
    
    return { books, loading, error };
};
    
export default useBooks;
