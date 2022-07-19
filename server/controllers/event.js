const db = require("../db/postgresql")
const router = require('express').Router();


router.post("/", async (req, res) => {

    // event collector for usage information

  res.status(201).send("CREATED")
});

module.exports = router


