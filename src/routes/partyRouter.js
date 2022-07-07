
//ACA PREGUNTAR SI LAS DECLARACIONES DE ACA ARRIBA IGUALES A PEOPLE SE DEJAN O SE SACAN

const express = require("express");
const partyController = require("../controllers/partyController") //preguntar si esta bien
const validator = require('express-joi-validation').createValidator({})
const bodySchema = require('../validations/partyBodyValidator')


const router = (Party) => { // Aca utilizaremos Express y nuestro
    // Controller para indicar qué hacer en cada petición!
    const partyRouter = express.Router()

    const { getAllParty, getPartyById, postParty, putPartyById, deletePartyById } =
    partyController(Party)

    partyRouter
        .route('/party')
        .get(getAllParty)
        .post(validator.body(bodySchema), postParty)

    partyRouter
        .route('/party/:id')
        .get(getPartyById)
        .put(validator.body(bodySchema), putPartyById)
        .delete(deletePartyById)

    return partyRouter
}

module.exports = router