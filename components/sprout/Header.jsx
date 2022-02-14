import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

export default function Header() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const isDarkMode = localStorage.getItem('dark mode')
        if (isDarkMode != null) setDarkMode(isDarkMode === 'true')
    }, [])

    useEffect(() => {
        localStorage.setItem('dark mode', darkMode)

        if (darkMode) {
            const overlay = document.createElement('div')
            overlay.classList.add('dark')
            document.body.appendChild(overlay)
        } else document.querySelector('.dark')?.remove()
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode(!darkMode)

    return (
        <div className={styles.container}>
            <Tab link="/sprout/sandbox">Sandbox</Tab>
            <Tab link="/sprout/docs">Tutorial</Tab>
            <div className={styles.tab} onClick={toggleDarkMode}>
                Dark Mode
            </div>
        </div>
    )
}

function Tab({ children, link, blankTarget }) {
    if (blankTarget)
        return (
            <Link href={link} passHref>
                <a target="_blank" className={styles.tab}>
                    {children}
                </a>
            </Link>
        )

    return (
        <Link href={link}>
            <font className={styles.tab}>{children}</font>
        </Link>
    )
}
