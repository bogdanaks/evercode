import api from '../axios'

export const useCryptoBalance = (ticker, address, showError) => {
    const getBalance = async () => {
        try {
            const res = await api.get(`/api/crypto/${ticker}/${address.trim()}`)
            return res.data
        } catch (error) {
            showError(error.response.data.message)
        }
    }
    return {
        ticker,
        address,
        getBalance,
    }
}
