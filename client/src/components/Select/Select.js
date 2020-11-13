import React from 'react'

import styles from './styles.module.scss'

import BTC from '../../assets/icons/btc.svg'
import ETH from '../../assets/icons/eth.svg'
import XRP from '../../assets/icons/xrp.svg'
import BNB from '../../assets/icons/bnb.svg'
import BCH from '../../assets/icons/bch.svg'

export const Select = ({ select, setSelect }) => {
    const divRef = React.useRef(null)
    const [open, setOpen] = React.useState(false)

    const handleOpenList = () => {
        setOpen(!open)
    }
    const handleSetSelect = (title, desc) => {
        setSelect({ title, desc })
    }
    React.useEffect(() => {
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
                <li onClick={() => handleSetSelect('BTC', 'Биткойн')}>
                    <img src={BTC} alt="BTC" />
                    <h4>Биткойн</h4>
                    <span>BTC</span>
                </li>
                <li onClick={() => handleSetSelect('ETH', 'Ethereum')}>
                    <img src={ETH} alt="ETH" />
                    <h4>Ethereum</h4>
                    <span>ETH</span>
                </li>
                <li onClick={() => handleSetSelect('XRP', 'Рябь')}>
                    <img src={XRP} alt="XRP" />
                    <h4>Рябь</h4>
                    <span>XRP</span>
                </li>
                <li onClick={() => handleSetSelect('BNB', 'Binance Coin')}>
                    <img src={BNB} alt="BNB" />
                    <h4>Binance Coin</h4>
                    <span>BNB</span>
                </li>
                <li onClick={() => handleSetSelect('BCH', 'Биткойн Кэш')}>
                    <img src={BCH} alt="BCH" />
                    <h4>Биткойн Кэш</h4>
                    <span>BCH</span>
                </li>
            </ul>
        </div>
    )
}
