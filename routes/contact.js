const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const db = require("../models");
const { Op } = require("sequelize");
const { contacts } = db;

// middlewares
router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

// get all contacts from database
router.get('/fetchall', async (req, res) => {
    var fetchAll = await contacts.findAll();
    res.send(fetchAll)
})

// get a particular contact from database by
router.get('/fetch/:query', async (req, res) => {
    // handling of non-integer queries
    if (isNaN(req.params.query)) {
        try {
            var fetchOne = await contacts.findOne({
                where:
                {
                    [Op.or]:
                        [
                            { Email: req.params.query },
                            { phoneNum: req.params.query }

                        ]
                }
            });
        }
        catch (err) {
            console.log(err)
            res.send("no contact found with the query " + req.params.query)
        }
    }
    // handling of integer queries
    else {
        try {
            var fetchOne = await contacts.findOne({
                where:
                {
                    [Op.or]:
                        [
                            { id: req.params.query },
                            { phoneNum: req.params.query }
                        ]
                }
            });
        }
        catch (err) {
            console.log(err)
            res.send("no contact found with the query " + req.params.query)
        }
    }
    res.send(fetchOne)
})

// saving data to database
router.post('/save', async (req, res) => {
    const save_contact = await contacts.create({
        fullName: req.body.name,
        Email: req.body.email,
        phoneNum: req.body.phone,
        date: req.body.date,
        site: "crm4sme"
    })
        .then(() => {
            console.log("inserted successfully")
            res.send(req.body)
        })
        .catch((err) => {
            console.log(err);
        })
})
module.exports = router;