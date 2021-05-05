const Medicine = require('../models/medicine.model');
const Pet = require('../models/pet.model');

module.exports = {
  async create(req, res) {
    try {
      const { body, params: { userID } } = req;
      const pet = await Pet.findById(body.petID);

      if(pet.clientID.toString() === userID.toString()) {
        const medicine = await Medicine.create( body );
        pet.medicineIDs.push(medicine._id);
        await pet.save({ validateBeforeSave: false });
        res.status(200).json({ message: 'Medicine created successfully', medicine });
      } else {
        throw 'Pet is not owned by current client';
      }

    } catch (error) {
      res.status(400).json({ message: 'Medicine could not be created', error });
    }
  },
  async list(req, res) {
    try {
      const { query } = req;

      const medicines = await Medicine.find(query);
      res.status(200).json({ message: `${medicines.length} medicines found`, medicines });

    } catch (error) {
      res.status(400).json({ message: 'Medicines could not be found', error });
    }
  },
  async update(req, res) {
    try {
      const { body } = req;
      const medicineID = body.medicineID;
      const medicine = await Medicine.findById(medicineID);

      if (medicine.petID.toString() === body.petID.toString()) {
        const medicineUpdate = await Medicine.findByIdAndUpdate(medicineID, body, {
          new: true,
        });
        res.status(200).json({ message: 'Medicine updated', medicineUpdate });
      } else {
        throw 'Medicine is not owned by current pet';
      }

    } catch (error) {
      res.status(400).json({ message: 'Medicine could not be updated', error });
    }
  },
  async destroy(req, res) {
    try {
      const { body } = req;
      const medicineID = body.medicineID;
      const medicine = await Medicine.findById(medicineID);
      const pet = await Pet.findById(body.petID);

      if (medicine.petID.toString() === pet._id.toString()) {
        pet.medicineIDs.pull(medicineID);
        pet.save({ validateBeforeSave: false });
        const medicineDelete = await Medicine.findByIdAndDelete(medicineID);
        res.status(200).json({ message: 'Medicine deleted', medicineDelete });
      } else {
        throw 'Medicine not owned';
      }

    } catch (error) {
      res.status(400).json({ message: 'Medicine could not be deleted', error });
    }
  },
};
