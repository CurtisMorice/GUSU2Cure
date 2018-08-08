const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    const queryText = `SELECT user_id, username, email, contact_info, type FROM users JOIN profiles ON users.id = user_id ORDER BY users.type ASC;`;
    pool.query(queryText)
        .then((result) => {
            console.log('back from the database with all users');
            res.send(result.rows);
        }).catch((error) => {
            console.log('error getting all users', error);
            res.sendStatus(500);
        })
})

router.get('/articles', (req, res) => {
    const queryText = `SELECT articles.id, date_posted, research_date, research_title, institution_name, institution_url, 
                        funding_source, related_articles, admin_comment, statuses.status, research_type.type, research_phase.phase, username, email FROM articles
                        JOIN statuses ON articles.status = statuses.id
                        RIGHT JOIN research_type ON articles.research_type = research_type.id
                        JOIN research_phase ON articles.research_phase = research_phase.id
                        LEFT JOIN users ON user_id = users.id
                        WHERE statuses.status = 'approved'
                        ORDER BY date_posted ASC;`
    pool.query(queryText)
        .then((result) => {
            console.log('back from the databse with all the approved articles', result);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error getting approved articles', error);
            res.sendStatus(500);
        })
})

router.get('/newArticles', (req, res) => {
    const queryText = `SELECT articles.id,date_posted,research_date,research_title,research_phase.phase,institution_name,institution_url,funding_source,related_articles,admin_comment,statuses.status,research_type.type,username,email FROM articles
    JOIN statuses ON articles.status = statuses.id
    RIGHT JOIN research_type ON articles.research_type = research_type.id
    JOIN research_phase ON articles.research_phase = research_phase.id
    LEFT JOIN users ON user_id = users.id WHERE statuses.status = 'pending'
    ORDER BY research_date ASC;`
    pool.query(queryText)
    .then((result) => {
        console.log('back from the databse with all the approved articles', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error getting approved articles', error);
        res.sendStatus(500);
    })
})

router.put(`/articles/:id`,(req,res) =>{
    console.log('THIS is the put in admin router',req.params, req.body)
    const id = req.params.id;
    const status = req.body.approved
    console.log('PUT in ROuter',id, status);
    const queryText=`UPDATE articles SET status=$1 WHERE id=$2;`
    pool.query(queryText, [status,id])
    .then((result) => {
        console.log(result, req.params.id);
        res.sendStatus(201)
    })
    .catch((error) => {
        console.log('error getting', error);
        res.sendStatus(500);
    })
}) 


module.exports = router;