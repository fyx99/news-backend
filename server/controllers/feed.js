const db = require("../db/postgresql")
const router = require('express').Router();
const axios = require('axios');

const recommend_service_host = "http://" + process.env.NR_HOST + ":" + process.env.NR_PORT  || "http://localhost:8000"

router.get("/", async (req, res) => {
    const offset = (req.query.offset && req.query.offset >= 0) ? req.query.offset : 0
    let response = null
    try{
        response = await axios.get(recommend_service_host + '/content/' + '74d06a24-ae32-4cf3-be20-a8d98be251b4', timeout=1000)
    }
    catch(e){

        console.log("Error in Call to Newsrecommend")
        console.log(e);
    }

    if(response){
        console.log(response);
        console.log(response.explanation);
        console.log(response.data);
        res.json(response.data)
    }
    else{
        console.log("Fallback Postgres Direct Query")
        const qres = await db.query(`
        select C.* from (
        SELECT * FROM Articles_clean 
        except select Articles_clean.* from Articles_clean inner join Reads on id = article_id
        where user_id = $1
        except select A.* from Articles_clean as A inner join Preferences as P on A.feed = p.feed_url
        where type = 'UNFOLLOW' and user_id = $1 ) as C
        limit 50 offset $2`,
        ['74d06a24-ae32-4cf3-be20-a8d98be251b4', offset])
        res.json(qres.rows)
    }

});

router.get("/:publisher", async (req, res) => {

    const publisher = req.params.publisher ? req.params.publisher : null
    const offset = (req.query.offset && req.query.offset >= 0) ? req.query.offset : 0

    const qres = await db.query(`
            select C.* from (
            SELECT * FROM Articles_clean where publisher = $1
            except select Articles_clean.* from Articles_clean inner join Reads on id = article_id
            where user_id = $2
            except select A.* from Articles_clean as A inner join Preferences as P on A.feed = p.feed_url
            where type = 'UNFOLLOW' and user_id = $1 ) as C
            limit 50 offset $3`,
        [publisher, '74d06a24-ae32-4cf3-be20-a8d98be251b4', offset])
    res.json(qres.rows)
});





module.exports = router