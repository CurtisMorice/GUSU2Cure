const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM resources;`;
    pool.query().then(()=>{

    }).catch((error)=>{

    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;