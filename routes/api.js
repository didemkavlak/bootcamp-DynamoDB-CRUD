//api.js
const express = require('express')
let router = express.Router();

const productsEndpoint = require('./products/products')

router.use('/products',productsEndpoint)

module.exports = router;
