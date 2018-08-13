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

router.get('/filterByLocation', (req, res)=> {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    console.log('lat:', lat);
    console.log('lng:', lng);
    const latRangeMinus = lat-2;    
    const latRangePlus = lat+2;
    const lngRangeMinus = lng-2;
    const lngRangePlus = lng+2;
    console.log('lat range:', latRangeMinus);
    console.log('lat range:', latRangePlus);
    console.log('lat range:', lngRangeMinus);
    console.log('lat range:', lngRangePlus);

    
    const queryText = `SELECT articles.*, statuses.status, locations.lat, locations.lng, locations.address from articles                        JOIN statuses ON articles.status = statuses.id
    RIGHT JOIN research_type ON articles.research_type = research_type.id
    JOIN research_phase ON articles.research_phase = research_phase.id
    LEFT JOIN users ON user_id = users.id
    JOIN locations on location_id = locations.id
    WHERE (lat BETWEEN ${latRangeMinus} AND ${latRangePlus})
    AND (lng BETWEEN ${lngRangeMinus} AND ${lngRangePlus})
    AND (statuses.status = 'approved' OR statuses.status = 'edit-review'
    OR statuses.status = 'edit-delete');`
    console.log('queryText:', queryText);
    pool.query(queryText)
    .then((result)=>{
        console.log('back from database with articles filtered by location:', result.rows);
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log('error getting filtered list of articles:', error);
        res.sendStatus(500);
    })
})

router.get('/articles', (req, res) => {
    const queryText = `SELECT articles.id, date_posted, research_date, research_title, institution_name, institution_url, 
                        funding_source, related_articles, admin_comment, statuses.status, research_type.type, research_phase.phase, username, email FROM quasi-articles
                        JOIN statuses ON articles.status = statuses.id
                        RIGHT JOIN research_type ON articles.research_type = research_type.id
                        JOIN research_phase ON articles.research_phase = research_phase.id
                        LEFT JOIN users ON user_id = users.id
                        WHERE statuses.status = 'approved'
                        OR statuses.status = 'edit-review'
                        OR statuses.status = 'edit-delete'
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
    const id = req.params.id;
    const status = req.body.approved || req.body.rejected;
    const admin_comment = req.body.comments;
    const queryText=`UPDATE articles SET status=$1, admin_comment=$3 WHERE id=$2;`
    pool.query(queryText, [status , id, admin_comment])
    .then((result) => {
        console.log(result);
        res.sendStatus(201)
    })
    .catch((error) => {
        console.log('error getting', error);
        res.sendStatus(500);
    })
}) 

router.delete('/deleteUser/:id', (req, res) => {
    let id = req.params.id
    console.log('this is is the id in the router', id);
    const queryText = `DELETE FROM users WHERE id = $1`;
    pool.query(queryText, [id])
        .then((result) => {
            console.log('successful delete of user', result);
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('Error deleting the user', error);
            res.sendStatus(500)
        })
})

router.put(`/usertype/:id`, (req, res) => {
    console.log('Changing user type in the admin Router, ID',  req.params.id);
    console.log('Changing user type in the admin Router, body',  req.body.payload);
    let userId = req.params.id;
    let userType = req.body.payload;
    queryText = `UPDATE users SET type=$1 WHERE id=$2;`;
    pool.query(queryText, [userType, userId])
        .then((result) => {
            console.log('successfull user type change');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error changing user type in router', error);
            res.sendStatus(500);
        })
})

router.delete(`/deleteArticle/:id`, (req, res) => {
    console.log('id to delete', req.params.id);
    let id = req.params.id;
    const queryText = `DELETE FROM articles WHERE id = $1`;
    pool.query(queryText, [id])
        .then((result) => {
            console.log('Successfull delete of article');
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('Error deleting article', error);
            res.sendStatus(500);
        })
 })

module.exports = router;