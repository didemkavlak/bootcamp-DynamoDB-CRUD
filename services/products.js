//requires
const AWS = require('aws-sdk')
const {v4:uuidv4} = require('uuid')

// aws updatw
AWS.config.update({
    region: "us-east-1",
    accessKeyId: "your_key1",
    secretAccessKey: "your_secret_key1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

let docClient = new AWS.DynamoDB.DocumentClient();
var table = "products";

//Add function
exports.add = async (params)=>{
    const items = {
        TableName : table,
        Item: {
            productId: uuidv4(),
            stock: params.stock,
            productName: params.productName,
            isDiscount: params.isDiscount,
            category:{
                categoryId: params.categoryId,
                categoryName: params.categoryName
            }
        }
    }
    try {
        await docClient.put(items).promise();
        return {
            status: true,
            message: 'Kategori eklendi'
        }
    } catch (err) {
        return {
            status: false,
            message: err
        }
    }
}

//Single fetch function
exports.fetchSingle = async (params) => { 
    var items = {
        TableName: table,
        Key:{
            id : params.id
        }
    };
    try {
        const data = await docClient.get(items).promise();
        return {
            status: true,
            data: data
        }
    } catch (err) {
        return {
            status: false,
            message: err
        }
    }
}

// Fetch all function
exports.fetchAll = async () => {
    const  items = {
        TableName:table
    };
   
    try {
        const data = await docClient.scan(items).promise();
        return {
            status: true,
            data: data
        }
    } catch (err) {
        return {
            status: false,
            message: err
        }
    }
}

//Update function
exports.update = async (params) => {
    var items = {
        TableName:table,
        Key:{
            id: params.id,
        },
    UpdateExpression: "set productName = :productName",
    ExpressionAttributeValues:{
        ":productName":params.productName,
    },
    ReturnValues:"UPDATED_NEW"
   };
    try {
        const data = await docClient.update(items).promise();
        return {
            status: true,
            data: data,
            message: 'Kategori güncellendi'
        }
    } catch (err) {
        return {
            status: false,
            message: err
        }
    }
}

//Delete function
exports.delete = async (params) => {
    var items = {
        TableName:table,
        Key:{
            id : params.id
        },
    };
    try {
        const response = await docClient.delete(items).promise();
        return {
            status: true,
            message: 'Kategori silindi'
        }
    } catch (err) {
        return {
            status: false,
            message: err
        }
    }
}
