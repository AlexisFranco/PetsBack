const { model, Schema, models } = require('mongoose');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      validate: {
        async validator(name) {
          try {
            const pet = await models.Pet.findOne({ name });
            return !pet;
          } catch (error) {
            return false;
          }
        },
        message: 'El correo electrónico ya exite',
      },
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
      type: Number,
      required: [true, 'Es necesario agregar el peso actual de la mascota'],
    },
    idealWeight: {
      type: Number,
      required: [true.valueOf, 'El peso ideal de tu mascota es necesaria'],
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
