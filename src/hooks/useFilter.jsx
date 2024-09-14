import { useState, useEffect } from 'react';

const useFilter = (books) => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filterTags, setFilterTags] = useState([]);

    useEffect(() => {
        const savedTags = sessionStorage.getItem('filterTags');

        if (savedTags) {
            setFilterTags(JSON.parse(savedTags));
        }
    }, []);

    useEffect(() => {
        const filterBooks = () => {
            if (filterTags.length === 0) {
                setFilteredBooks(books);
            } else {
                const filtered = books.filter(book =>
                filterTags.every(tag => book.tags.includes(tag))
            );
                setFilteredBooks(filtered);
            }
        };
        filterBooks();
    }, [books, filterTags]);

    const addFilterTag = (tag) => {
        const newTags = [...filterTags, tag];
        
        setFilterTags(newTags);
        sessionStorage.setItem('filterTags', JSON.stringify(newTags));
    };

    const removeFilterTag = (tag) => {
        const newTags = filterTags.filter(t => t !== tag);
        
        setFilterTags(newTags);
        sessionStorage.setItem('filterTags', JSON.stringify(newTags));
    };

    return { filteredBooks, filterTags, addFilterTag, removeFilterTag };
};

export default useFilter;
