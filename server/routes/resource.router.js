const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route to get all resources
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM resources;`;
    pool.query(queryText).then((result)=>{
        console.log('result.rows:', result.rows);
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error getting resources:', error);
        res.sendStatus(500);
    });
});

// route to post a resource
router.post('/', (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const summary = req.body.summary;
    const queryText = `INSERT INTO resources(name, url, summary) VALUES ($1,$2,$3);`;
    pool.query(queryText, [name, url, summary])
    .then(()=>{
        console.log('resource created');
        res.sendStatus(201)
    })
    .catch((error)=>{
        console.log('error creating resource:', error);
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) =>{
    const id = req.params.id;
    const name = req.body.name;
    const url = req.body.url;
    const summary = req.body.name;
    const queryText = `UPDATE resources SET name=$1, url=$2, summary=$3 WHERE id=$4;`
    pool.query(queryText, [name, url, summary, id])
    .then(()=>{
        console.log('updated resource');
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('error updating resource:', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) =>{
    const id = req.params.id;
    const queryText = `DELETE FROM resources WHERE id=$1;`;
    pool.query(queryText, [id])
    .then(()=>{
        console.log('deleted resource');
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('error deleting resource:', error);
        res.sendStatus(500);
        
    })
})

module.exports = router;