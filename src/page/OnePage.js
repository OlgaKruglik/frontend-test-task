import React from 'react'
import styles from '../style/OnePage.module.css';
import StoreBook from  '../components/StoreBook'

function OnePage() {
    return (
        <div className={styles.app}>
            <div className={styles.headingDiv}>
                <h1 className={styles.pageh1}>Book Store</h1>
            </div>
            <StoreBook />
        </div>
    )
}

export default OnePage
