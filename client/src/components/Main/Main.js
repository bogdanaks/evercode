import React from 'react'

import styles from './styles.module.scss'

import { Select } from '../Select/Select'
import { Input } from '../Input/Input'
import { useCryptoBalance } from '../../utils/hooks/useCryptoBalance/useCryptoBalance'

export const Main = () => {
    const [list, setList] = React.useState([])
    const [input, setInput] = React.useState('')
    const [select, setSelect] = React.useState({ title: 'SELECT', desc: '' })

    const { getBalance, loader } = useCryptoBalance(select.title, input)

    const handleAddClick = async () => {
        const balance = await getBalance()
        setList((prevState) => [...prevState, { select, address: input, cash: balance }])
        setInput('')
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainBlock}>
                <div className={styles.header}>
                    <h2>Get crypto balance</h2>
                    <button>Export CSV</button>
                </div>
                <div className={styles.row}>
                    <Select select={select} setSelect={setSelect} />
                    <Input input={input} setInput={setInput} />
                    <button onClick={handleAddClick}>Add</button>
                </div>
                {list.length > 0 && (
                    <ul className={styles.list}>
                        {list.map((el, index) => {
                            return (
                                <li key={index}>
                                    <div className={styles.title}>
                                        <h4>{el.select.desc}</h4>
                                        <span>{el.select.title}</span>
                                    </div>
                                    <span className={styles.address}>{el.address}</span>
                                    <span className={styles.cash}>{el.cash}</span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
