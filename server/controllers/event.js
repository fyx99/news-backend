const db = require("../db/postgresql")
const router = require('express').Router();


router.post("/", async (req, res) => {

    // event collector for usage information

    /*
    {
      "event_type": "click",
      "event_data": { ... }
    }
    
    */

    const events = Array.isArray(req.body) ? req.body : [req.body]
    for (const event of events) {
        const event_data = event.event_data
        switch (event.event_type) {
            case "read":
                const qres = await db.query(`INSERT INTO Reads values ($1, $2, $3, $4, $5);`, [event_data.user_id, event_data.article_id, event_data.start_date, event_data.end_date, event_data.max_scroll])
                if(!qres){
                    var a="issue"
                }
                break;
            case "impression":
                const qres2 = await db.query(`INSERT INTO Impressions values ($1, $2, $3, $4, $5);`, [event_data.user_id, event_data.article_id, event_data.start_date, event_data.end_date, event_data.rank])
                if(!qres){
                    var a="issue"
                }
                break;

            default:
                break;
        }
    }


    res.status(201).send("CREATED")
});

module.exports = router


