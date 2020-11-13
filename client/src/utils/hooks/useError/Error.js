import React from 'react'
import { createPortal } from 'react-dom'

import styles from './styles.module.scss'

export const Error = ({ text, margin }) => {
    const body = document.body
    return createPortal(
        <div className={styles.errorBlock} style={{ marginTop: `${margin}px` }}>
            <span>{text}</span>
        </div>,
        body,
    )
}
