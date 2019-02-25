const express = require('express');
const router = express.Router();
const path = require('path');

const restApi = require(path.resolve(__dirname, '../../utils/restApi'));
const table = require('./schema').table;

router.get('/table', (req, res)=>{
    // let query;
    // if (!req.params) {
    //     query = {};
    // }
    // table.find(query)
    //     .then(data => {
    //         res.json(data)
    //     })
    //     .catch(err => {
    //         res.json(err)
    //     })
    async function result(req, res) {
        let skip = +req.query.start;
        let limit = +req.query.limit;
        let query = {};
        
        for (let [key, value] of Object.entries(req.query)) {
          if (key !== 'start' && key !== 'limit' && value !== '') {
            query[key] = key !== 'age'? value : +value;
          }
        }
        let datas = await table.find(query).skip(skip).limit(limit);
        datas = Array.from(datas);
        const counts = await table.countDocuments(query);
        res.json({datas, counts});
    }
    result(req, res);    
});

router.post('/table', (req, res)=> {
    table.create(req.body, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(restApi.success())
        }
    })
    // let data = new BaseTable({
    //     date : req.body.date,
    //     name : req.body.name,
    //     address : req.body.address
    // })
    // data.save( (err,data) => {
    //     if (err) {
    //     res.json(err)
    //     } else {
    //     res.json(data)
    //     }
    // })
});
router.put('/table/:id', (req, res)=>{
  table.findOneAndUpdate(
    { _id : req.params.id},
    { $set : req.body},
    { new : true})
    .then(data => res.json(restApi.success(data)))
    .catch(err => res.json(err))
});

router.delete('/table', (req, res)=>{
  const ids = JSON.parse(req.query.ids);
  table.remove({ _id:{$in: ids}})
    .then(data => {
        res.json(restApi.success(data))
    })
    .catch(err => res.json(err))
});

module.exports = router;