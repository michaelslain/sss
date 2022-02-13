import React from 'react'
import styles from './NotOnMobile.module.css'

export default function NotOnMobile() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Get off your phone!</h1>
            <h2 className={styles.subheading}>Sorry too harsh?</h2>
            <h2 className={styles.subheading}>Well I don't think I asked...</h2>
            <h2 className={styles.subheading}>
                Just open your computer this page doesn't work on mobile
            </h2>
        </div>
    )
}
