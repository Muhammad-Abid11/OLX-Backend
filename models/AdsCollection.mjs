import mongoose, { Schema, model } from "mongoose"

const adsSchema = new Schema({
    name: String,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    image: {
        type: Array || String,
    },
    uid: String,
    viewState: {
        type: Object,
        default: {
            latitude: 24.9135104,
            Longitude: 67.0826496,
            zoom: 16,
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const AdsCollection = new mongoose.model("MyAds", adsSchema);
export default AdsCollection