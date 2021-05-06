const { model, Schema } = require('mongoose');

const zoneSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'La zona de caminata es requerida'],
    },
  },
  {
    timestamps: true,
  }
);

const Zone = model('Zone', zoneSchema);

module.exports = Zone;
