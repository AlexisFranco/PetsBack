const { model, Schema } = require('mongoose');

const serviceSchema = new Schema(
  {
    initLoc: {
      type: String,
      required: [true, 'La dirección de recogida es necesaria'],
    },
    time: {
      type: String,
      required: [true, 'El tiempo de la caminata es necesaria'],
    },
    date: {
      type: String,
      required: [true, "La fecha de la caminata es necesaria"],
    },
    cost: {
      type: String,
    },
    status: {
      type: String,
      default: 'Solicitado',
    },
    hour: {
      type: Number,
      required: [true, 'La hora de recogida de la mascota es necesario'],
    },
    petID: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    walkerID: {
      type: Schema.Types.ObjectId,
      ref: 'Walker',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = model('Service', serviceSchema);

module.exports = Service;
