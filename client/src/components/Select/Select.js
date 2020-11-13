import React from 'react'
import api from '../../utils/axios'

import styles from './styles.module.scss'
import { icons } from '../../utils/icons'

export const Select = ({ select, setSelect }) => {
    const divRef = React.useRef(null)
    const [open, setOpen] = React.useState(false)
    const [list, setList] = React.useState([])

    const handleOpenList = () => {
        setOpen(!open)
    }
    const handleSetSelect = (title, desc) => {
        setSelect({ title, desc })
    }
    React.useEffect(() => {
        async function fetchList() {
            const res = await api.get('/api/crypto')
            setList(res.data)
        }
        fetchList()

        function handleClickOutside(event) {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            setOpen(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={styles.wrapper} ref={divRef}>
            <div className={styles.select} onClick={handleOpenList}>
                <h4>{select.desc}</h4>
                <span>{select.title}</span>
            </div>
            <ul className={[styles.ulBlock, open ? styles.show : ''].join(' ')}>
                {list.map((el) => {
                    return (
                        <li key={el.id} onClick={() => handleSetSelect(el.ticker, el.title)}>
                            <img src={icons[el.ticker]} alt={el.ticker} />
                            <h4>{el.title}</h4>
                            <span>{el.ticker}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
