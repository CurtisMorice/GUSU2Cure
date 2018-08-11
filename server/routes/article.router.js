const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// LEAVE THIS HERE FOR NOW FOR USE AS TEMPLATE

// GET call for user's submitted articles
router.get(`/userArticle/:id`, (req, res) => {
    let id = req.params.id
    console.log('this is id',id);
    const queryText = `SELECT research_type.type, research_phase.phase, articles.id, location_id, user_id, date_posted, research_date, research_title, research_type, research_phase, institution_name, institution_url, funding_source, related_articles, admin_comment, statuses.status FROM articles JOIN statuses ON articles.status = statuses.id JOIN research_type on articles.research_type=research_type.id JOIN research_phase ON articles.research_phase=research_phase.id WHERE user_id = $1`;
    pool.query(queryText, [id])
    .then((result)=>{
        console.log('back from database with articles', result.rows);
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log('error getting articles:', error);
        res.sendStatus(500);
    })
});

router.get('/', (req, res) => {
    let param = req.query.param;
    let value = req.query.value;
    
    console.log('param:', param, 'value:', value);
    
    // for filtering by research type
    if (param === 'type'){
        const queryText = `SELECT articles.*, research_type.type, locations.address, locations.lat, locations.lng FROM articles JOIN locations ON locations.id = articles.location_id JOIN research_type on articles.research_type = research_type.id WHERE research_type.id = ${value} ORDER BY id;`;
        pool.query(queryText)
        .then((result)=>{
            // console.log('back from database with articles', result.rows);
            res.send(result.rows);
        })
        .catch((error)=>{
            console.log('error getting articles:', error);
            res.sendStatus(500);
        })
    }

    // for filtering by research phase

    else if (param === 'phase') {
        const queryText = `SELECT articles.*, research_phase.phase, locations.address, locations.lat, locations.lng FROM articles JOIN locations ON locations.id = articles.location_id JOIN research_phase
        on articles.research_phase = research_phase.id WHERE research_phase.id = ${value} ORDER BY id;`;
        
        pool.query(queryText)
        .then((result)=>{
            // console.log('back from database with articles', result.rows);
            res.send(result.rows);
        })
        .catch((error)=>{
            console.log('error getting articles:', error);
            res.sendStatus(500);
        })
    }

    // for getting all articles
    else {
        const queryText = `SELECT articles.*, locations.address, locations.lat, locations.lng FROM articles JOIN locations ON locations.id = articles.location_id ORDER BY id;`;
        pool.query(queryText)
        .then((result)=>{
            // console.log('back from database with articles', result.rows);
            res.send(result.rows);
        })
        .catch((error)=>{
            console.log('error getting articles:', error);
            res.sendStatus(500);
        })
    }
   
});

router.get('/type', (req, res) => {
    const queryText = `SELECT * FROM research_type`;
    pool.query(queryText)
    .then((result)=>{
        console.log('back from database with research types', result.rows);
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log('error getting research types:', error);
        res.sendStatus(500);
    })
});

router.get('/phase', (req, res) => {
    const queryText = `SELECT * FROM research_phase`;
    pool.query(queryText)
    .then((result)=>{
        console.log('back from database with research phases', result.rows);
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log('error getting research phases:', error);
        res.sendStatus(500);
    })
});

// first has to insert into locations and return id, then inserts that into articles
router.post('/', (req, res) => {
    const address = req.body.address;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const queryText = `INSERT INTO locations(address, lat, lng) VALUES ($1, $2, $3) RETURNING id;`
    pool.query(queryText, [address, lat, lng])
    .then((result)=>{
        console.log('inserted into location', result);
        const location_id = result.rows[0].id;
        const user_id = req.body.user_id;
        const research_date = req.body.research_date;
        const research_title = req.body.research_title;
        const research_type = req.body.research_type;
        const research_phase = req.body.research_phase;
        const institution_name = req.body.institution_name;
        const institution_url = req.body.institution_url;
        const status = 1;
        const funding_source = req.body.funding_source;
        const related_articles = req.body.related_articles;
        const brief_description = req.body.brief_description;
        const summary = req.body.summary;
        const user_story = req.body.user_story;
        const articleQueryText = `INSERT INTO articles(location_id, user_id, research_date, research_title, research_type,
        research_phase, institution_name, institution_url, status, funding_source, related_articles, brief_description, summary, user_story)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
        pool.query(articleQueryText, [location_id, user_id, research_date, research_title, research_type,
        research_phase, institution_name, institution_url, status, funding_source, related_articles, brief_description, summary, user_story])
        .then(()=>{
            console.log('article successfully created');
            res.sendStatus(201);
        }).catch((error)=>{
            console.log('error creating article:', error);
            res.sendStatus(500);
        })
        
    }).catch((error)=>{
        console.log('error inserting location:', error);
        res.sendStatus(500);
    })
});

// this is where we will also delete the quasi_articles row upon successfully editing the articles table with the updated info
router.put('/:id', (req, res) => {
    const articleQueryText = `UPDATE articles SET research_date = $1, research_title = $2, research_type = $3,
        research_phase = $4, institution_name = $5, institution_url = $6, funding_source = $7, related_articles = $8 WHERE id = $9;`;
        pool.query(articleQueryText, [req.body.research_date, req.body.research_title, req.body.research_type, req.body.research_phase, req.body.institution_name, req.body.institution_url, req.body.funding_source, req.body.related_articles, id])
        .then(() => {
            console.log('article successfully updated');
            res.sendStatus(201);
        }).catch((error) =>{
            console.log('error updating article:', error);
            res.sendStatus(500);
        }) 
    })

router.delete('/:id', (req,res) => {
    let queryText = 'DELETE FROM locations WHERE id = $1;';
    pool.query(queryText, [req.params.id])
    .then((result) => {
        console.log('successfully deleted article');  
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error deleting article', error);
        res.sendStatus(500);
    })
})

// quasi_articles routes
router.put('/quasi_articles/:id', (req, res) => {
    
})

router.post('/quasi_articles', (req, res) => {
        console.log('in route to post quasi article');
        const article_id = req.body.article_id;
        const location_id = req.body.article_id;
        const user_id = req.body.user_id;
        const research_date = req.body.research_date;
        const research_title = req.body.research_title;
        const research_type = req.body.research_type;
        const research_phase = req.body.research_phase;
        const institution_name = req.body.institution_name;
        const institution_url = req.body.institution_url;
        const status = 1;
        const funding_source = req.body.funding_source;
        const related_articles = req.body.related_articles;
        const brief_description = req.body.brief_description;
        const summary = req.body.summary;
        const user_story = req.body.user_story;
        const queryText = `
        INSERT INTO quasi_articles(article_id, location_id, user_id, research_date, research_title, research_type, research_phase, 
        institution_name, institution_url, status, funding_source, related_articles, brief_description, summary, user_story) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 
        $12, $13, $14, $15);`
        pool.query(queryText, [article_id, location_id, user_id, research_date, research_title, research_type, research_phase, institution_name,
        institution_url, status, funding_source, related_articles, brief_description, summary, user_story])
        .then(()=>{
            console.log('successfully posted quasi_article');
            res.sendStatus(201);
        })
        .catch((error)=>{
            console.log('error posting into quasi_articles:', error);
            res.sendStatus(500);
        })
});

router.get('/quasi_articles', (req, res) => {
    console.log('in route to get quasi_articles');
    const queryText = `SELECT * from quasi_articles`
    pool.query(queryText)
    .then((result)=>{
        console.log('fetched quasi articles');
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log('error fetching quasi articles:', error);
        res.sendStatus(500);
    })
});

module.exports = router;
