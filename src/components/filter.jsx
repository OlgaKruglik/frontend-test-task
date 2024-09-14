import React from 'react'
import styles from '../style/OnePage.module.css'
import images from '../style/image/Arrow 1 (2).svg'
import FilterTags from '../components/FilterTags'

function filter({ sortOption, sortOrder, handleSort }) {
    
    return (
    <div className={styles.headingDiv3}>
    <div className={styles.filter}>
    <div className={styles.filterComponent} onClick={() => handleSort('price')}>
    <p>price</p>
    <img 
    src={images} 
    alt='Example' 
    className={`${styles.image} ${sortOption === 'price' && sortOrder === 'asc' 
    ? styles.rotateUp 
    : styles.rotateDown}`} 
    />
    </div>
    <div className={styles.filterComponent} onClick={() => handleSort('author')}>
    <p>author</p>
    <img 
    src={images} 
    alt='Example' 
    className={`${styles.image} ${sortOption === 'author' && sortOrder === 'asc' 
    ? styles.rotateUp 
    : styles.rotateDown}`} 
    />
    </div>
    <div className={styles.filterComponent} onClick={() => handleSort('date')}>
    <p>date</p>
    <img 
    src={images} 
    alt='Example' 
    className={`${styles.image} ${sortOption === 'date' && sortOrder === 'asc' 
    ? styles.rotateUp 
    : styles.rotateDown}`} 
    />
    </div>
    </div>
    <FilterTags />
    </div>
    );
    }

export default filter
