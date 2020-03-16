const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

/*
Zona
Nombre
Puede dar tránsito 
  Tiene mascotas / Cuantas
  Experiencia
  Casa / Departamento
  Personas que viven ahí
  Horarios en que está en el domicilio PENSANDO
Puede adoptar
  Tiene mascotas / Cuantas
  Experiencia
  Casa / Departamento
  Personas que viven ahí
  Horarios en que está en el domicilio
Puede viajar
  Zona
  Días
  Horarios
  Tiene caniles propios
*/

const HostSchema = new mongoose.Schema({
  hostId: {
    type: String,
    required: [true, "Please add a host ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Host ID must be less than 10 characters"]
  },
  name: {
    type: String,
    require: [true, "Please add a name"]
  },
  experience: {
    type: Boolean
  },
  pets: {
    type: Number
  },
  persons: {
    type: Number
  },
  type: {
    type: String
  },
  mobility: {
    type: Boolean
  },
  mobilitySchedule: {
    mon: {
      open: {
        type: Number
      },
      close: {
        type: Number
      }
    },
  },
  hasTransportBox: {
    type: Boolean
  },
  address: {
    type: String,
    require: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      emun: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location
HostSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Host", HostSchema);
