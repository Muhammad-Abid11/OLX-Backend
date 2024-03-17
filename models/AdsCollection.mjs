import mongoose, { Schema, model } from "mongoose"

const adsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desciption: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    viewState: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const AdsCollection = new mongoose.model("MyAds", adsSchema);
export default AdsCollection