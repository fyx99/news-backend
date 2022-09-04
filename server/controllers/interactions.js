const db = require("../db/postgresql")
const router = require('express').Router();


router.post("/read", async (req, res) => {

    const sql = `INSERT INTO public.reads(
    user_id, article_id, start_date, end_date, max_scroll)
    VALUES ($1, $2, $3, $4, $5);`

    const db_res = await db.query(sql, [
        req.body.user_id,
        req.body.article_id,
        req.body.start_date,
        req.body.end_date,
        req.body.max_scroll
    ]).catch(e => console.error(e))

    res.status(201).send("CREATED")
});

router.post("/impression", async function (req, res) {

    const sql = `INSERT INTO public.impressions(
              user_id, article_id, start_date, end_date, rank)
              VALUES ($1, $2, $3, $4, $5);`

    const db_res = await db.query(sql, [
        req.body.user_id,
        req.body.article_id,
        req.body.start_date,
        req.body.end_date,
        req.body.rank
    ]).catch(e => console.error(e))

    res.status(201).send("CREATED")
});


router.post("/preferences", async function (req, res) {

    const sql = `INSERT INTO public.preferences (user_id, feed_url, type) values ($1, $2, $3)`

    const db_res = await db.query(sql, [
        req.body.user_id,
        req.body.feed_url,
        req.body.type
    ]).catch(e => console.error(e))

    res.status(201).send("CREATED")
});


module.exports = router


