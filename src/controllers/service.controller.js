const Service = require('../models/service.model');
const Pet = require('../models/pet.model');
const Walker = require('../models/walker.model');

module.exports = {
  async create(req, res) {
    try {
      const { body, userID } = req;
      const pet = await Pet.findById(body.petID);
      const walker = await Walker.findById(body.walkerID);

      if(pet.clientID.toString() === userID.toString()) {
        const service = await Service.create(body);

        pet.serviceIDs.push(service._id);
        await pet.save({ validateBeforeSave: false });

        walker.serviceIDs.push(service._id);
        await walker.save({ validateBeforeSave: false });

        res.status(200).json({ message: 'Service created successfully', service });
      } else {
        throw 'Pet is not owned by current client';
      }

    } catch (error) {
      res.status(400).json({ message: 'Service could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const services = await Service.find(query).populate({
        path: 'petID',
        select: 'name',
      });
      res.status(200).json({ message: `${services.length} services found`, services });
    } catch (error) {
      res.status(400).json({ message: 'Services could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const { body, userID, params: { serviceID } } = req;

      const walker = await Walker.findById(userID);
      const service = await Service.findById(serviceID);

      if (walker._id.toString() === service.walkerID.toString()) {
        const serviceUpdate = await Service.findByIdAndUpdate(serviceID, body, {
          new: true,
        });
        res.status(200).json({ message: 'Service updated', serviceUpdate });
      } else {
        throw 'Service is not asigned to current walker';
      }

    } catch (error) {
      console.dir(error)
      res.status(400).json({ message: 'Service could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { body, userID } = req;
      const petID = body.petID;
      const walkerID = body.walkerID;
      const serviceID = body.serviceID;
      const pet = await Pet.findById(petID);
      const walker = await Walker.findById(walkerID);

      if (pet.clientID.toString() === userID.toString()) {
        pet.serviceIDs.pull(serviceID);
        pet.save({ validateBeforeSave: false });

        walker.serviceIDs.pull(serviceID);
        walker.save({ validateBeforeSave: false });
        const serviceDelete = await Service.findByIdAndDelete(serviceID);

        res.status(200).json({ message: 'Service deleted', serviceDelete });
      } else {
        throw 'Service not owned';
      }
    } catch (error) {
      res.status(400).json({ message: 'Service could not be deleted', error });
    }
  },
};
