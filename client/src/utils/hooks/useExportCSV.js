import React from 'react'
import { CSVLink } from 'react-csv'

export const useExportCSV = (data, showError) => {
    const [arr, setArr] = React.useState([])

    const headers = [
        { label: 'Валюта', key: 'title' },
        { label: 'Адрес', key: 'address' },
        { label: 'Баланс', key: 'balance' },
    ]

    const download = () => {
        if (data.length > 0) {
            data.forEach((el) => {
                setArr((prevState) => [
                    ...prevState,
                    {
                        title: `${el.info.desc} ${el.info.title}`,
                        address: el.address,
                        balance: String(el.cash),
                    },
                ])
            })
            return true
        } else {
            showError('Список пуст!')
            return false
        }
    }
    return {
        Link: (
            <CSVLink filename={'evercode.csv'} data={arr} onClick={download} headers={headers}>
                Export CSV
            </CSVLink>
        ),
    }
}
