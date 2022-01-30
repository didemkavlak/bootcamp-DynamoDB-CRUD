//controllers
//recuires
const productsService = require('../services/products')

//exports
exports.add = async (req,res) => {
    const response = await productsService.add(req.body); 
    res.send(response);
}

exports.fetchAll = async (req,res) => {
    const response = await productsService.fetchAll();
    res.send(response); 
}

exports.fetchSingle = async (req,res) => {
    const response = await productsService.fetchSingle(req.params); 
    res.send(response);
}

exports.update = async (req,res) => {
    const response = await productsService.update(req.body);
    res.send(response);
}

exports.delete = async (req,res) => {
    const response = await productsService.delete(req.params);
    res.send(response); 
}
