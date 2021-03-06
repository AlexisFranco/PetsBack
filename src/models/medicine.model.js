const { model, Schema } = require('mongoose');

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del medicamento es requerido'],
    },
    whatMedicine: {
      type: String,
      required: [true, 'El tipo del medicamento es requerido'],
    },
    dose: {
      type: String,
      required: [true, 'La dosis es requerida'],
    },
    initHour: {
      type: String,
      required: [
        true,
        'La hora en que comenzaste a sumunistrarlo es necesaria',
      ],
    },
    initDate: {
      type: String,
      required: [true, 'El día que comenzaste a sumunistrarlo es necesario'],
    },
    repetition: {
      type: String,
      required: [true, 'Por favor ingresa cada cuanto tiempo se debe suministrar el medicamento'],
    },
    petID: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = model('Medicine', medicineSchema);

module.exports = Medicine;
