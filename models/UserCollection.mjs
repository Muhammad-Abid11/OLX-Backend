import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import jwtSecret from '../config/jwt.mjs'
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        unigue: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: {
        default: [],
        type: []
    }
})

userSchema.pre("save", function (next) {
    const user = this
    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
    }
    next()
})

userSchema.methods.comparePassword = function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password)
}


userSchema.methods.generateToken = function () {
    try {
        const user = this
        const { _id } = this
        const token = jwt.sign({ _id }, jwtSecret);
        return token
    } catch (error) {
        console.log("error-->", error.message)
    }
}

const UsersCollection = new mongoose.model("OLXUsers", userSchema);
export default UsersCollection