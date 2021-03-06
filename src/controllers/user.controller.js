const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');
const Walker = require('../models/walker.model');

module.exports = {
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      let userType = '';
      let validUser = await Client.findOne({ email });

      userType = 'client';

      if (!validUser) {
        validUser = await Walker.findOne({ email });
        userType = 'walker';
      }

      if (!validUser) {
        throw Error('email o contraseña invalida');
      }
      const isValidPass = await bcrypt.compare(password, validUser.password);

      if (!isValidPass) {
        throw Error('Usuario o contraseña inválida');
      }

      const token = jwt.sign(
        { userID: validUser._id, userType },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(201).json({ token, userType, id:validUser._id });

    } catch(error) {
      res.status(401).json({ message: error.message })
    }
  },
};
