const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `SELECT * FROM comments WHERE article_id=$1;`;
    pool.query(queryText, [id])
    .then((results)=>{
        console.log('got comments back from database for article_id:', id);
        res.send(results.rows)
    })
    .catch((error)=>{
        console.log('error getting comments:', error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    const comment = req.body.comment;
    const article_id = req.body.article_id;
    const user_id = req.body.user_id;
    const queryText = `INSERT INTO comments(comment, user_id, article_id) VALUES ($1, $2, $3);`
    pool.query(queryText, [comment, user_id, article_id])
    .then(()=>{
        console.log('comment posted');
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log('error posting comment:', error);
        res.sendStatus(500);
    })
});

// do we want users to have the ability to update their comments?
router.put('/:id', (req, res)=>{
    const id = req.params.id;
    const comment = req.body.comment;
    const queryText = `UPDATE comments SET comment=$1 WHERE id=$2;`
    pool.query(queryText, [comment, id])
    .then(()=>{
        console.log('updated comment');
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('error updating comment:', error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    const queryText = `DELETE FROM comments WHERE id=$1;`
    pool.query(queryText, [id])
    .then(()=>{
        console.log('deleted comment');
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('error deleting comment:', error);
        res.sendStatus(500);
    })
})


module.exports = router;