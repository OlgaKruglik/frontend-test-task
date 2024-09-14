import { useState, useEffect } from 'react';

const useFilter = (books) => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filterTags, setFilterTags] = useState([]);
    
    useEffect(() => {
    const savedTags = sessionStorage.getItem('filterTags');
    if (savedTags) {
    const parsedTags = JSON.parse(savedTags);
    setFilterTags(parsedTags);
    console.log('Loaded filterTags from sessionStorage:', parsedTags);
    }
    }, []);
    
    useEffect(() => {
    const filterBooks = () => {
    if (filterTags.length === 0) {
    setFilteredBooks(books);
    sessionStorage.setItem('filteredBooks', JSON.stringify(books));
    console.log('Filtered books (no tags):', books);
    } else {
    const filtered = books.filter(book =>
    filterTags.every(tag => book.tags.includes(tag))
    );
    setFilteredBooks(filtered);
    sessionStorage.setItem('filteredBooks', JSON.stringify(filtered));
    console.log('Filtered books (with tags):', filtered);
    }
    };
    filterBooks();
    }, [books, filterTags]);
    
    const addFilterTag = (tag) => {
    const newTags = [...filterTags, tag];
    setFilterTags(newTags);
    sessionStorage.setItem('filterTags', JSON.stringify(newTags));
    console.log('Added filterTag:', newTags);
    };
    
    const removeFilterTag = (tag) => {
    const newTags = filterTags.filter(t => t !== tag);
    setFilterTags(newTags);
    sessionStorage.setItem('filterTags', JSON.stringify(newTags));
    console.log('Removed filterTag:', newTags);
    };
    
    return { filteredBooks, filterTags, addFilterTag, removeFilterTag };
    };
    

export default useFilter;
