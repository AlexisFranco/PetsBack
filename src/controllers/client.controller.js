const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');
const Pet = require('../models/pet.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;

      const client = await Client.create(body);
      const token = jwt.sign(
        { userID: client._id, userType: 'client' },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );
      res.status(200).json({ message: 'Client created successfully', token, client });

    } catch (error) {
      res.status(400).json({ message: 'Client could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const clients = await Client.find(query);
      res.status(200).json({ message: `${clients.length} clients found`, clients });

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
