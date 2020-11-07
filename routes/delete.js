var express = require('express');
var router = express.Router();
require('dotenv').config()
const aws = require('aws-sdk')

let config = {
        "region": "us-east-2",
        "accessKeyId": process.env.AWSAccessKeyId,
        "secretAccessKey": process.env.AWSSecretKey
    }
    /* GET home page. */
aws.config.update(config)

const dynamoDB = new aws.DynamoDB.DocumentClient({
    endpoint: "http://dynamodb.us-east-2.amazonaws.com"
})
router.delete('/', function(req, res) {
    console.log(req.body)
    res.render('delete');
});
router.get('/:masanpham', (req, res) => {

    let param = {
        TableName: "sanpham",
        Key: {
            "masanpham": req.params.masanpham,
        }
    }
    dynamoDB.delete(param, (err, data) => {
        if (err) console.log("loi Xoa", err)
        else console.log("xoa thanh cong ")

    })
    res.redirect('../')

})

module.exports = router;