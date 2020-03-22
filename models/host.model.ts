import { model, Schema } from 'mongoose';
import { IHost } from './interfaces/host.interface';
const { geocoder } = require("../utils/geocoder");

const HostSchema: Schema = new Schema({
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
HostSchema.pre<IHost>("save", async function (next) {
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

export default model<IHost>('Host', HostSchema);
