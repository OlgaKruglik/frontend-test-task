import React from 'react'
import styles from '../style/App.module.css';
import Filter from '../components/filter'
import Heading from '../components/heading';
import StoreBook from  '../components/StoreBook'

function OnePage() {
    return (
        <div className={styles.app}>
            <Heading />
            <StoreBook />
        </div>
    )
}

export default OnePage
