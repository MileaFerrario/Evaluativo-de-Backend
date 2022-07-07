
const httpStatus = require ('../helpers/httpStatus')
//const bcrypt = //require('bcrypt')

const partyController = (Party) => {
  // GET ALL
  const getAllParty = async (req, res, next) => {
    // Dentro de la función ponemos nuestras peticiones HTTP
    // ASÍNCRONAS
    try {
      // ejecuta
      const { query } = req

      const response = await Party.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      // se ejecuta si hay un error, 
      next(err)
    }
  }

   // GET BY ID
  const getPartyById = async (req, res,next) => {
    try {
      const { params } = req;

      const response = await Party.findById(params.id);

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      next(err)
    }
  };
//'-------------------------------------------------------------------------------------------------

  // POST
  const postParty = async (req, res, next) => {
    try {
      const { body } = req

      const party = await new Party(body)

      await party.save()

      return res.status(httpStatus.CREATED).json(party)
    } catch (err) {
      next(err)
    }
  }
  //
  //.----------------------------------------------------------------------
  // PUT BY ID
  const putPartyById = async (req, res, next) => {
    try {
      const { body, params } = req

      const checkData = await Party.find({
        _id: params.id
      })

      if (checkData === null) {
        return res.status(FORBIDDEN).send('No data found with the provided ID.')
      }

      await Party.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            numberOfPeople: body.numberOfPeople,
            thematic: body.thematic,
            veganOrCarnivorousFood: body.veganOrCarnivorousFood,
            music: body.music,
            alcoholicDrinks: body.alcoholicDrinks,
            hours: body.hours,
            name: body.name

          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated')
    } catch (err) {
      next(err)
    }
  }

  // DELETE
  const deletePartyById = async (req, res, next) => {
    try {
      // ejecuta
      const { params } = req

      await Party.findByIdAndDelete(params.id)

       return res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      // se ejecuta si hay un error
      next(err)
    }
  }
  return {
    getAllParty,
    getPartyById,
    postParty,
    putPartyById,
    deletePartyById
  }
}

module.exports = partyController