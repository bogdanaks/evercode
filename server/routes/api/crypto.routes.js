const { Router } = require('express')
const router = Router()
const { cryptoWallets, cryptoBalance } = require('../../controllers/cyptoController')

/*
@route   GET api/crypto/
@desc    Get crypto wallets
@access  Public
*/
router.get('/', cryptoWallets)

/*
@route   POST api/crypto/:ticker/:address
@desc    Get balance by ticket and address
@access  Public
*/
router.get('/:ticker/:address', cryptoBalance)

module.exports = router
