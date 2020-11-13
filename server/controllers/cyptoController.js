const db = require('../db.json')
const request = require('request-promise')

exports.cryptoWallets = (req, res) => {
    try {
        return res.status(200).send(db.wallets)
    } catch (err) {
        return res.status(500).send({ message: 'Server error: ' + err })
    }
}

exports.cryptoBalance = async (req, res) => {
    switch (req.params.ticker) {
        case 'BTC':
            try {
                const res1 = await request(
                    `https://blockchain.info/q/getreceivedbyaddress/${req.params.address}`,
                    {
                        json: true,
                    },
                )
                const res2 = await request(
                    `https://blockchain.info/q/getsentbyaddress/${req.params.address}`,
                    {
                        json: true,
                    },
                )
                const balance = (res1 - res2) / 100000000
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'ETH':
            try {
                const result = await request(
                    `https://api.etherscan.io/api?module=account&action=balance&address=${req.params.address}&tag=latest&apikey=X33BANRQV6XFBS1DNIU45Z4JHUYW8CM7X8`,
                    {
                        json: true,
                    },
                )
                if (result.status === '0') {
                    throw 'Invalid address'
                }
                const balance = result.result / 1000000000000000000
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'XRP':
            try {
                const result = await request(
                    `https://data.ripple.com/v2/accounts/${req.params.address}/balances`,
                    {
                        json: true,
                    },
                )
                const balance = result.balances[0].value
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'BCH':
            try {
                const result = await request(
                    `https://rest.bitcoin.com/v2/address/details/${req.params.address}`,
                    {
                        json: true,
                    },
                )
                const balance = result.balance
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'BSV':
            try {
                const result = await request(
                    `https://api.whatsonchain.com/v1/bsv/main/address/${req.params.address}/balance`,
                    {
                        json: true,
                    },
                )
                const balance = result.confirmed / 100000000
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'LTC':
            try {
                const result = await request(
                    `https://sochain.com/api/v2/get_address_balance/LTC/${req.params.address}`,
                    {
                        json: true,
                    },
                )
                const balance = result.data.confirmed_balance
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'DASH':
            try {
                const result = await request(
                    `https://sochain.com/api/v2/get_address_balance/DASH/${req.params.address}`,
                    {
                        json: true,
                    },
                )
                const balance = result.data.confirmed_balance
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'ZEC':
            try {
                const result = await request(
                    `https://sochain.com/api/v2/get_address_balance/ZEC/${req.params.address}`,
                    {
                        json: true,
                    },
                )
                const balance = result.data.confirmed_balance
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        case 'DOGE':
            try {
                const result = await request(
                    `https://sochain.com/api/v2/get_address_balance/DOGE/${req.params.address}`,
                    {
                        json: true,
                    },
                )
                const balance = result.data.confirmed_balance
                return res.status(200).send(String(balance))
            } catch (error) {
                return res.status(500).send({ message: 'Invalid address' })
            }
        default:
            return res.status(500).send({ message: 'Ticker undefined' })
    }
}
