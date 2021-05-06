const Zone = require('../models/zone.model');

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;

      const zone = await Zone.create(body);

      res.status(200).json({ message: 'Zone created successfully', zone });

    } catch (error) {
      res.status(400).json({ message: 'Zone could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const zones = await Zone.find(query);
      res.status(200).json({ message: `${zones.length} zones found`, zones });

    } catch (error) {
      res.status(400).json({ message: 'Zones could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const { body } = req;
      const zoneID = body.zoneID;

      const zoneUpdate = await Zone.findByIdAndUpdate(zoneID, body, {
        new: true,
      });
      res.status(200).json({ message: 'Zone updated', zoneUpdate });

    } catch (error) {
      res.status(400).json({ message: 'Zone could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { body } = req;
      const zoneID = body.zoneID;

      const zoneDelete = await Zone.findByIdAndDelete(zoneID);
      res.status(200).json({ message: 'Zone deleted', zoneDelete });

    } catch (error) {
      res.status(400).json({ message: 'Zone could not be deleted', error });
    }
  },
};
