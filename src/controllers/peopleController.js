const bcrypt = require('bcrypt')
const httpStatus = require('../helpers/httpStatus')

const peopleController = (People) => {
  // GET ALL
  const getAllPeople = async (req, res , next) => {
    
    // Dentro de la función ponemos nuestras peticiones HTTP
    // ASÍNCRONAS
    try {
      // ejecuta
      const { query } = req

      const response = await People.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      // se ejecuta si hay un error, 
      next(err)
    }
  }

   // GET BY ID
  const getPeopleById = async (req, res, next) => {
    try {
      const { params } = req;

      const response = await People.findById(params.id);

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      next(err)
    }
  };

  // POST
  const postPeople = async (req, res, next) => {
    try {
      const { body } = req

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const people = await new People(encryptedData)

      await people.save()

      return res.status(httpStatus.CREATED).json(people)
    } catch (err) {
      next(err)
    }
  }
  // PUT BY ID
  const putPeopleById = async (req, res, next) => {
    try {
      const { body, params } = req

      const checkData = await People.find({
        _id: params.id
      })

      if (checkData === null) {

        return res.status(httpStatus.FORBIDDEN).send('No data found with the provided ID.')
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      await People.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: encryptedPassword,
            email: body.email,
            address: body.address,
            phone: body.phone
            

          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated')//
    } catch (err) {
      next(err)
    }
  }

  // DELETE
  const deletePeopleById = async (req, res, next) => {
    try {
      // ejecuta
      const { params } = req

      await People.findByIdAndDelete(params.id)

      res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      // se ejecuta si hay un error
      next(err)
    }
  }
  return {
    getAllPeople,
    getPeopleById,
    postPeople,
    putPeopleById,
    deletePeopleById
  }
}

module.exports = peopleController