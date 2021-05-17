const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');
const Pet = require('../models/pet.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;

      const client = await Client.create(body);
      const userID = client._id;
      const userType = 'client';

      const token = jwt.sign({ userID, userType }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({ token, userType, userID });

    } catch (error) {
      res.status(400).json({ message: 'Client could not be created', error });
    }
  },
  async show(req, res) {
    try {
      const { userID } = req;

      const client = await Client.findById(userID).populate('petIDs')
      res.status(200).json({ message: 'Client found', client });

    } catch (error) {
      res.status(400).json({ message: 'Clients could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const { body, userID } = req;

      const clientUpdate = await Client.findByIdAndUpdate(userID, body, { new: true });
      res.status(200).json({ message: 'Client updated', clientUpdate });

    } catch (error) {
      console.dir(error)
      res.status(400).json({ message: 'Client could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { userID } = req;
      const client = await Client.findById(userID);

      client.petIDs.map(async (pet) => {
        await Pet.findByIdAndDelete(pet._id);
      })
      const clientDelete = await Client.findByIdAndDelete(userID);
      res.status(200).json({ message: 'Client deleted', clientDelete });

    } catch (error) {
      res.status(400).json({ message: 'Client could not be deleted', error });
    }
  },
};
