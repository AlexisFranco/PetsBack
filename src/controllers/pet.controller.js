const Pet = require('../models/pet.model');
const Client = require('../models/client.model');

module.exports = {
  async create(req, res) {
    try {
      const { body, userID, userType } = req;

      if (userType === 'client') {
        const pet = await Pet.create({ ...body, clientID: userID });
        const client = await Client.findById(userID);

        client.petIDs.push(pet._id);
        await client.save({ validateBeforeSave: false });
        res.status(200).json({ message: 'Pet created successfully', pet });
      } else {
        throw Error('User was not client');
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async list(req, res) {
    try {
      const { userID } = req;
      const objClient = {
        clientID: userID,
      };
      const pets = await Pet.find(objClient).populate('medicineIDs');
      res.status(200).json({ message: `${pets.length} pets found`, pets });
    } catch (error) {
      res.status(400).json({ message: 'Pets could not be found', error });
    }
  },
  async show(req, res) {
    try {
      const { userID, params: { petID } } = req;
      const pet = await Pet.findById(petID);

      if (pet.clientID.toString() === userID.toString()) {
        res.status(200).json({ message: 'Pet found', pet });
      } else {
        throw 'Pet is not owned by current client';
      }
    } catch (error) {
      res.status(400).json({ message: 'Pet could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const { body, userID } = req;
      const petID = body.petID;
      const pet = await Pet.findById(petID);

      if (pet.clientID.toString() === userID.toString()) {
        const petUpdate = await Pet.findByIdAndUpdate(petID, body, {
          new: true,
        });
        res.status(200).json({ message: 'Pet updated', petUpdate });
      } else {
        throw 'Pet is not owned by current client';
      }
    } catch (error) {
      res.status(400).json({ message: 'Pet could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { body, userID } = req;
      const petID = body.petID;
      const client = await Client.findById(userID);
      const pet = await Pet.findById(petID);

      if (pet.clientID.toString() === userID.toString()) {
        client.petIDs.pull(petID);
        client.save({ validateBeforeSave: false });
        const petDelete = await Pet.findByIdAndDelete(petID);
        res.status(200).json({ message: 'Pet deleted', petDelete });
      } else {
        throw 'Pet not owned';
      }
    } catch (error) {
      res.status(400).json({ message: 'Pet could not be deleted', error });
    }
  },
};
