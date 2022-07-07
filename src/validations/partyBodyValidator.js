const Joi = require('joi')

const schema = Joi.object({

  numberOfPeople: Joi.string().alphanum().min(3).max(30).required(),
  thematic: Joi.string().alphanum().min(3).max(30).required(),
  veganOrCarnivorousFood: Joi.string().alphanum().min(3).max(30).required(),
  music: Joi.string().alphanum().min(3).max(30).required(),
  alcoholicDrinks: Joi.string().alphanum().min(3).max(30).required(),
  hours: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  //preguntar si en horas el numero de string cambia como en telefono



})

module.exports = schema