const { model, Schema, models } = require('mongoose');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
    },
    whatPet: {
      type: String,
      required: [true, 'Es necesario saber si es perro o gato'],
    },
    dateBirth: {
      type: String,
      required: [true, 'La fecha de nacimiento es requerida'],
    },
    weight: {
      type: String,
      required: [true, 'Es necesario agregar el peso actual de la mascota'],
    },
    idealWeight: {
      type: String,
      required: [true, 'El peso ideal de tu mascota es necesaria'],
    },
    breed: {
      type: String,
    },
    exercise: {
      type: Boolean,
    },
    photo: {
      type: String,
    },
    serviceIDs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    },
    medicineIDs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Medicine' }],
    },
    clientID: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = model('Pet', petSchema);

module.exports = Pet;
