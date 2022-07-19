const express = require('express');
// const userRoutes = require('./user.route');
const statistics = require('../controllers/interactions');
const feed = require('../controllers/feed');
const db = require("../db/postgresql")


const router = require('express-promise-router')();

router.get('/status', (req, res) => res.send('OK'));


router.use('/statistics', statistics);
router.use('/feed', feed);

router.get('/healtz', async (req, res) => {    
    const db_res = await db.query("select 1 + 2 as result;")
    if(db_res && db_res.rows && db_res.rows[0]["result"] == 3){
        return res.sendStatus(200)
    }
    res.sendStatus(500)
})

router.post('/query', async (req, res) => {    
      const db_res = await db.query(req.body.query)
      res.send(db_res)
})


module.exports = router;