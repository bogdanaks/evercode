import React from 'react'

import styles from './styles.module.scss'

export const Input = ({ input, setInput }) => {
    return (
        <input
            className={styles.input}
            type="text"
            placeholder="Address"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    )
}
