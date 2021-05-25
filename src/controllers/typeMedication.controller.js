const TypeMedication = require('../models/typeMedication.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;

      const typeMedication = await TypeMedication.create(body);

      res.status(200).json({ message: 'Type created successfully', typeMedication });

    } catch (error) {
      res.status(400).json({ message: 'Type could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const types = await TypeMedication.find(query);
      res.status(200).json({ message: `${types.length} types found`, types });

    } catch (error) {
      res.status(400).json({ message: 'Types could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const { body } = req;
      const typeID = body.typeID;

      const typeUpdate = await TypeMedication.findByIdAndUpdate(typeID, body, {
        new: true,
      });
      res.status(200).json({ message: 'Type updated', typeUpdate });

    } catch (error) {
      res.status(400).json({ message: 'Pet could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { body } = req;
      const typeID = body.typeID;

      const typeDelete = await TypeMedication.findByIdAndDelete(typeID);
      res.status(200).json({ message: 'Type deleted', typeDelete });

    } catch (error) {
      res.status(400).json({ message: 'Type could not be deleted', error });
    }
  },
};
