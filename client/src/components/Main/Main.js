import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './styles.module.scss'
import { icons } from '../../utils/icons'

import { Select } from '../Select/Select'
import { Input } from '../Input/Input'
import { useCryptoBalance } from '../../utils/hooks/useCryptoBalance'
import { useExportCSV } from '../../utils/hooks/useExportCSV'
import { useError } from '../../utils/hooks/useError'

export const Main = () => {
    const [list, setList] = React.useState([])
    const [input, setInput] = React.useState('')
    const [select, setSelect] = React.useState({ title: 'SELECT', desc: '' })

    const { Error, show } = useError()
    const { getBalance } = useCryptoBalance(select.title, input, show)
    const { Link } = useExportCSV(list, show)

    const handleAddClick = async () => {
        if (input.length > 0) {
            const balance = await getBalance()
            if (balance !== undefined) {
                const check = list.some((el) => el.address === input.trim())
                if (!check) {
                    setList((prevState) => [
                        ...prevState,
                        { info: select, address: input, cash: balance, uuid: uuidv4() },
                    ])
                    setInput('')
                } else {
                    show('Такой адрес уже есть, удалите его прежде чем добавить снова!')
                }
            }
        }
    }
    const handleDelete = (uuid) => {
        setList((prevState) => prevState.filter((i) => i.uuid !== uuid))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainBlock}>
                <div className={styles.header}>
                    <h2>Get crypto balance</h2>
                    {Link}
                </div>
                <div className={styles.row}>
                    <Select select={select} setSelect={setSelect} />
                    <Input input={input} setInput={setInput} />
                    <button onClick={handleAddClick}>Add</button>
                </div>
                {list.length > 0 && (
                    <ul className={styles.list}>
                        {list.map((el) => {
                            return (
                                <li key={el.uuid}>
                                    <img src={icons[el.info.title]} alt={el.info.title} />
                                    <div className={styles.title}>
                                        <h4>{el.info.desc}</h4>
                                        <span>{el.info.title}</span>
                                    </div>
                                    <span className={styles.address}>{el.address}</span>
                                    <span className={styles.cash}>{el.cash}</span>
                                    <div
                                        className={styles.delete}
                                        onClick={() => handleDelete(el.uuid)}>
                                        X
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <Error />
        </div>
    )
}
