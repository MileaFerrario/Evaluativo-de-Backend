const express = require("express");
const peopleController = require("../controllers/peopleController");
const validator = require('express-joi-validation').createValidator({})
const bodySchema = require('../validations/peopleBodyValidator')


const router = (People) => { // Aca utilizaremos Express y nuestro
    // Controller para indicar qué hacer en cada petición!
    const peopleRouter = express.Router()

    const { getAllPeople, getPeopleById, postPeople, putPeopleById, deletePeopleById } =
    peopleController(People)

    peopleRouter
        .route('/people')
       
        .get(getAllPeople)
        .post(validator.body(bodySchema), postPeople)

    peopleRouter
        .route('/people/:id')
        .get(getPeopleById)
        .put(validator.body(bodySchema), putPeopleById)
        .delete(deletePeopleById)

    return peopleRouter
}

module.exports = router