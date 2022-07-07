const mongoose = require('mongoose')

const { Schema } = mongoose

const partyModel = new Schema({

    numberOfPeople: { type: String, required: true, minLength: 3, maxLength: 30 },
    thematic: { type: String, required: true, minLength: 3, maxLength: 30 },
    veganOrCarnivorousFood: { type: String, required: true, minLength: 3, maxLength: 30 },
    music: { type: String, required: true, minLength: 3, maxLength: 30 },
    alcoholicDrinks: { type: String, required: true, minLength: 3, maxLength: 30 },
    hours: { type: String, required: true, minLength: 3, maxLength: 30 },
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
});

module.exports = mongoose.model('Party', partyModel)