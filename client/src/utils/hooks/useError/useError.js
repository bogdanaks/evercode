import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Error as ErrorComponent } from './Error'

export const useError = () => {
    const [errors, setErrors] = React.useState([])
    const show = (text) => {
        const errorId = uuidv4()
        setErrors((prevState) => [...prevState, { text, id: errorId }])
        setTimeout(() => {
            setErrors((prevState) => prevState.filter((i) => i.id !== errorId))
        }, 3000)
    }

    const Error = () => (
        <>
            {errors.length > 0 &&
                errors.map((error, index) => {
                    return <ErrorComponent key={error.id} text={error.text} margin={index * 60} />
                })}
        </>
    )
    return {
        Error,
        show,
    }
}
