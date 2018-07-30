const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// LEAVE THIS HERE FOR NOW FOR USE AS TEMPLATE

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT username, bio, contact_info, email FROM profiles JOIN users ON user_id = users.id;`
    pool.query(queryText)
        .then((result) => {
            console.log('profile page', result.rows);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error getting user profiles', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;