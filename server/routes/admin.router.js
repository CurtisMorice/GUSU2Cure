const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    const queryText = `SELECT user_id, username, email, contact_info, type FROM profiles JOIN users ON users.id = users.id;`;
    pool.query(queryText)
        .then((result) => {
            console.log('back from the database with all users');
            res.send(result.rows);
        }).catch((error) => {
            console.log('error getting all users', error);
            res.sendStatus(500);
        })
})

module.exports = router;