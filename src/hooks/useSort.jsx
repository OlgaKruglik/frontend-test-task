import { useState, useEffect } from 'react';

    
const useSort = (books, initialSortOption = 'price', initialSortOrder = 'asc') => {
    const [sortedBooks, setSortedBooks] = useState([]);
    const [sortOption, setSortOption] = useState(initialSortOption);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    
    useEffect(() => {
        const sortBooks = () => {
            console.log('Sorting books with option:', sortOption, 'and order:', sortOrder);
            const sorted = [...books].sort((a, b) => {
            if (sortOption === 'author') {
                return sortOrder === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
            }
            if (sortOption === 'date') {
                return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            }
            return sortOrder === 'asc' ? a[sortOption] - b[sortOption] : b[sortOption] - a[sortOption];
            });
            setSortedBooks(sorted);
            sessionStorage.setItem('sortedBooks', JSON.stringify(sorted));
        };
        sortBooks();
    }, [books, sortOption, sortOrder]);
    
    const handleSort = (option) => {
        console.log('Handling sort for option:', option);
        if (sortOption === option) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortOption(option);
            setSortOrder('asc');
        }
    };
    
    return { sortedBooks, sortOption, sortOrder, handleSort };
};
    
    export default useSort;
