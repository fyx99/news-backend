const db = require("../db/postgresql")
const router = require('express').Router();

router.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id
    if (!user_id) {
        return res.status(404).json({ "STATUS": "USER_ID NOT FOUND" })
    }

    const qres = await db.query(`SELECT * FROM Users WHERE id = $1;`, [user_id])

    // arr?.[42]
    if (!qres?.rows?.[0]?.id) {
        return res.status(404).send("USER_ID DOES NOT EXIST")

    }

    return res.status(200).json({ "STATUS": "OK", "USER": qres.rows[0] })

});


router.post("/", async (req, res) => {
    const email = req.body.email

    if (!email) {
        return res.status(400).json({ "STATUS": "EMAIL MISSING" })
    }
    const qres = await db.query(`INSERT INTO Users (email, create_date) VALUES ($1, current_timestamp) ON CONFLICT ON CONSTRAINT users_unique_constraint do nothing returning id;`, [email])
    console.log(qres)
    // arr?.[42]
    if (!qres.rows?.[0]?.id) {
        return res.status(303).send("EMAIL EXISTS")

    }

    return res.status(201).json({ "STATUS": "CREATED", "USER_ID": qres.rows[0].id })

});



router.delete("/:user_id", async (req, res) => {
    const user_id = req.params.user_id
    if (!user_id) {
        return res.status(404).json({ "STATUS": "USER_ID NOT FOUND" })
    }

    const qres = await db.query(`DELETE FROM Users WHERE id = $1;`, [user_id])

    if (qres instanceof Error) {
        return res.status(400).send("USER_ID INVALID")
    }
    else if (!qres?.rowCount) {
        return res.status(404).send("NOTHING TO DELETE")

    }

    return res.status(200).json({ "STATUS": "DELETED" })

});

module.exports = router


