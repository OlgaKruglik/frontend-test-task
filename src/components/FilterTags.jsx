import React from 'react'
import images from '../style/image/Polygon 1.png';
import styles from '../style/OnePage.module.css'

function FilterTags({ filterTags, addFilterTag, removeFilterTag }) {
    const handleTagClick = (tag) => {
    if (filterTags.includes(tag)) {
    removeFilterTag(tag);
    } else {
    addFilterTag(tag);
    }
    };
    
    const tags = ['Science', 'Fiction', 'History', 'Health', 'Technology']; 
    
    return (
    <div className={styles.filterTags}>
    <div className={styles.filterComponent}>
    <p>tags</p>
    <img src={images} alt='Example' className={styles.image} />
    </div>
    <div className={styles.tagsList}>
    {tags.map((tag) => (
    <button
    key={tag}
    className={`${styles.tagButton} ${filterTags.includes(tag) ? styles.activeTag : ''}`}
    onClick={() => handleTagClick(tag)}
    >
    {tag}
    </button>
    ))}
    </div>
    <p onClick={() => filterTags.forEach(tag => removeFilterTag(tag))}>reset rules</p>
    </div>
    );
    }

export default FilterTags
