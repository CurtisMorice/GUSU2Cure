const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// LEAVE THIS HERE FOR NOW FOR USE AS TEMPLATE

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM profiles;';
    pool.query(queryText)
    .then((result) => {
        console.log('got profiles from database', result.rows);
        res.send(result.rows);   
    }).catch((error) => {
        console.log('error getting profiles from database', error);
        res.sendStatus(500);    
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;