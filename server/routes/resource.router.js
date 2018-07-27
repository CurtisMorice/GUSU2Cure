const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;