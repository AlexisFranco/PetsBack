const { model, Schema, models } = require('mongoose');
const bcrypt = require('bcrypt');

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const walkerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es requerido'],
      match: [emailRegex, 'Correo electrónico inválido'],
      validate: {
        async validator(email) {
          try {
            const walker = await models.Walker.findOne({ email });
            return !walker;
          } catch (error) {
            return false;
          }
        },
        message: 'El correo electrónico ya exite',
      },
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
    },
    phoneNum: {
      type: String,
      required: [true, 'El número de celular es requerido'],
      minlength: [10, 'El número de contacto debe ser de celular'],
    },
    description: {
      type: String,
    },
    cost: {
      type: Number,
    },
    workingHours: {
      type: String,
    },
    photo: {
      type: String,
    },
    zoneIDs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Zone' }],
    },
    serviceIDs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    },
  },
  {
    timestamps: true,
  }
);

walkerSchema.pre('save', async function () {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const Walker = model('Walker', walkerSchema);

module.exports = Walker;
