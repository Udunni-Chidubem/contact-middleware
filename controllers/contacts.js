const db = require("../models");
const { Op } = require("sequelize");
const { contacts } = db;
const responses = require("../helpers/responses");

const get_all_contacts = async (req, res) => {
    var fetchAll = await contacts.findAll();
    res.send(fetchAll)
}
const get_contact_by_id = async (req, res) => {
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
}
const save_contact = async (req, res) => {
    const save_contact = await contacts.create({
        fullName: req.body.name,
        Email: req.body.email,
        phoneNumber: req.body.phone,
        date: req.body.date,
        site: "crm4sme"
    })
        .then(() => {
            result = responses.success(req.body)
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    get_all_contacts,
    get_contact_by_id,
    save_contact
}