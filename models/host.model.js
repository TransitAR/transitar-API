const mongoose = require("mongoose");
const { geocoder } = require("../utils/geocoder");

// TODO: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mongoose#mongoose-methods-properties-constructors

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
  // Host id lo podria manejar mongo con el _id
  hostId: {
    type: String,
    required: [true, "Please add a host ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Host ID must be less than 10 characters"]
  },
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  experience: Boolean,
  pets: Number,
  persons: Number,
  type: String,
  mobility: Boolean,
  mobilitySchedule: {
    mon: {
      open: Number,
      close: Number
    }
  },
  hasTransportBox: Boolean,
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    formattedAddress: String,
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location
HostSchema.pre("save", async function(next) {
  const [loc] = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc.longitude, loc.latitude],
    formattedAddress: loc.formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Host", HostSchema);
