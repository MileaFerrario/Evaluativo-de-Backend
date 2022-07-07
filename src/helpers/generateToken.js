const jwt = require('jsonwebtoken')

const generateToken = (data) => 
{
  const token = jwt.sign(
    {
      username: data
    },
    process.env.SECRET,
    
    // { expiresIn: '1d' }
  )

  return token
}

module.exports = generateToken