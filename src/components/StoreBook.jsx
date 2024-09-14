import React, { useState, useEffect } from 'react';
import useBooks from '../hooks/useBooks'
import useSort from '../hooks/useSort';
import useFilter from '../hooks/useFilter';
import FilterTags from '../components/FilterTags';
import Filter from '../components/filter';
import styles from '../style/OnePage.module.css'


    function StoreBook() {
        const { books, loading, error } = useBooks();
        const [sortOption, setSortOption] = useState('price');
        const [sortOrder, setSortOrder] = useState('asc');
        const [currentPage, setCurrentPage] = useState(1);
        const [sortedBooks, setSortedBooks] = useState([]);
        const booksPerPage = 4;
        
        const { handleSort } = useSort(books, sortOption, sortOrder);
        const { filteredBooks, filterTags, addFilterTag, removeFilterTag } = useFilter(sortedBooks);
        
        useEffect(() => {
            setCurrentPage(1);
        }, [sortOption, sortOrder]);
        
        useEffect(() => {
            const sortedBooksFromStorage = JSON.parse(sessionStorage.getItem('sortedBooks'));

            if (sortedBooksFromStorage) {
                const sorted = sortOrder === 'asc' ? sortedBooksFromStorage : sortedBooksFromStorage.reverse();
                setSortedBooks(sorted);
            } else {
                setSortedBooks(books);
            }
        }, [books, sortOption, sortOrder]);
            

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error loading books: {error.message}</p>;
            
        const indexOfLastBook = currentPage * booksPerPage;
        const indexOfFirstBook = indexOfLastBook - booksPerPage;
        const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
            
        const totalPagePrice = currentBooks.reduce((total, book) => total + parseFloat(book.price), 0);
            
        const handleSortOption = (option) => {
            if (sortOption === option) {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setSortOption(option);
                setSortOrder('asc');
            }
        };
        
        const handleTagClick = (tag) => {
            if (filterTags.includes(tag)) {
                removeFilterTag(tag);
            } else {
                addFilterTag(tag);
            }
        };
        
        return (
            <div className={styles.main}>
                <div className={styles.headingDiv2}>
                    <Filter sortOption={sortOption} sortOrder={sortOrder} handleSort={handleSortOption} />
                    <FilterTags filterTags={filterTags} addFilterTag={addFilterTag} removeFilterTag={removeFilterTag} />
                </div>
                
                <div className={styles.storeBooks}>
                    {currentBooks.map((book, index) => {
                        if (!book.date || !book.price || !book.author || !book.tags) {
                            console.error(`Book at index ${index} is missing the "date" field:`, book);
                            return null;
                        }
                        
                        return (
                            <div key={book.title + index} className={styles.bookTitle}>
                                <div className={styles.bookInfo}>
                                    <h2>{indexOfFirstBook + index + 1} {book.title}</h2>
                                    <p>by {book.author} {book.date} {book.price}$</p>
                                </div>
                                
                                <div className={styles.line}></div>
                                <div className={styles.tags}>
                                    {book.tags.map((tag, tagIndex) => (
                                        <div
                                            key={`${book.title}-${tagIndex}`}
                                            className={styles.tag}
                                            onClick={() => handleTagClick(tag)}
                                            >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <div className={styles.total}>
                        <h2>Total: {totalPagePrice}$</h2>
                    </div>
                    <div className={styles.pagination}>
                        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
                            <button key={i} onClick={() => paginate(i + 1)} className={styles.pageButton}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

export default StoreBook
