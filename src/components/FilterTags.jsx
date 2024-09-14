import React, { useState, useEffect, useRef } from 'react';
import images from '../style/image/Polygon 1.png';
import styles from '../style/OnePage.module.css'

function FilterTags({ filterTags = [], addFilterTag, removeFilterTag }) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const handleTagClick = (tag) => {
        if (filterTags.includes(tag)) {
        removeFilterTag(tag);
        } else {
        addFilterTag(tag);
        }
        };

        const tags = ['Science', 'Fiction', 'History', 'Health', 'Technology', 'Climate change'];

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
            }
            };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.filterTags}>
            <div
                className={styles.filterComponent}
                onClick={() => setDropdownVisible(!isDropdownVisible)}
            >
                <p>tags</p>
                <img src={images} alt='Example' className={styles.image} />
            </div>
            {isDropdownVisible && (
                <div className={styles.dropdown} ref={dropdownRef}>
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
            )}
            <p onClick={() => filterTags.forEach(tag => removeFilterTag(tag))}>reset rules</p>
        </div>
    );
}

export default FilterTags
