const { model, Schema } = require('mongoose');

const typeMedicationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El tipo del medicamento es requerido'],
    },
  },
  {
    timestamps: true,
  }
);

const TypeMedication = model('TypeMedication', typeMedicationSchema);

module.exports = TypeMedication;
