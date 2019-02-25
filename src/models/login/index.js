const express = require('express');
const router = express.Router();
const nodeRsa = require('node-rsa');
const token = require('../../utils/token');
const restApi = require('../../utils/restApi');
const fs = require('fs');
const path = require('path');

const users = require('./schema').users;

router.post('/login',(req,res) => {
    let privatePem = fs.readFileSync('./private_pkcs.pem').toString();
    let private_key = new nodeRsa(privatePem);
    private_key.setOptions({encryptionScheme: 'pkcs1'});
    let payload = {
        username: req.body.username,
        password: private_key.decrypt(req.body.password, 'utf8')
    };
    console.log(private_key.decrypt(req.body.password, 'utf8'));
    users.findOne({username:req.body.username, password: private_key.decrypt(req.body.password, 'utf8')})
        .then(data => res.json(restApi.success({token:data.token})))
        .catch(err => res.json(restApi.failed(err)))
})


module.exports = router;