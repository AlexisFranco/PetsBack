const jwt = require('jsonwebtoken');
const Walker = require('../models/walker.model');

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;

      const walker = await Walker.create(body);
      const userID = walker._id;
      const userType = 'walker';

      const token = jwt.sign(
        { userID, userType },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );
      res.status(200).json({ token, userType, userID });

    } catch (error) {
      res.status(400).json({ message: 'Walker could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const walkers = await Walker.find(query)
        .populate({
          path: 'serviceIDs',
          populate: {
            path: 'petID',
            select: 'name',
          }
        });
      res.status(200).json({ walkers });

    } catch (error) {
      res.status(400).json({ message: 'Walkers could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const { body, userID } = req;

      const walkerUpdate = await Walker.findByIdAndUpdate(userID, body, { new: true });
      res.status(200).json({ message: 'Walker updated', walkerUpdate });

    } catch (error) {
      res.status(400).json({ message: 'Walker could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { userID } = req;

      const walkerDelete = await Walker.findByIdAndDelete(userID);
      res.status(200).json({ message: 'Walker deleted', walkerDelete });

    } catch (error) {
      res.status(400).json({ message: 'Walker could not be deleted', error });
    }
  },
};
