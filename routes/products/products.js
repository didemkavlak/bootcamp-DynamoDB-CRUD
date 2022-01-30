//requires
const aws = require('aws-sdk');
const express = require('express')
let router = express.Router();

let productsController = require('../../controllers/products')

//Routers
router.post('/',productsController.add);
router.get('/',productsController.fetchAll);
router.get('/:id',productsController.fetchSingle);
router.put('/',productsController.update);
router.delete('/:id',productsController.delete);

module.exports = router;
