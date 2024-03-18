import express from "express";
import userSchema from '../models/UserCollection.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'
const router = express.Router()

router.get("/", async (req, res) => {
    const userData = await userSchema.find()
    res.send({ message: 'Data fetched successfully', data: userData })
})

//===================User Register

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body
        console.log("registerd email", email)
        const user = await userSchema.findOne({ email })
        if (user) {
            res.send({ message: "Email already Exist!" })
            return
        }
        const userData = new userSchema(req.body)
        await userData.save()
        res.send({ message: 'User Registered successfully!', email })
    } catch (error) {
        console.log("error", error.message)
    }
})
export default router


//===================User login

router.put('/login', async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userSchema.findOne({ email })
        if (!user) {
            res.status(404).send({ message: "User not found!" })
            return
        }
        const isCorrectPassword = user.comparePassword(password)
        if (!isCorrectPassword) {
            res.status(404).send({ message: "Invalid Password" })
            return
        }

        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()
        res.send({ message: "User logged in successfully!" })

    } catch (error) {
        res.send("error", error.message)

    }
})

/* 
fetch("http://localhost:3001/users/login",{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer TOKEN"
    },
    body:JSON.stringify({
        email:"Maaz@gmail.com",
        password:"maaz123",
    })
}).then(res=>res.json())
.then(res=>console.log(res))

*/
//===================User Logout class 8

router.put('/logout', verifyToken, async (req, res) => {
    await userSchema.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})

/* 
fetch("http://localhost:3001/users/logout",{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer TOKEN"
    },
    body:JSON.stringify({
        email:"Maaz@gmail.com",
        password:"maaz123",
    })
}).then(res=>res.json())
.then(res=>console.log(res))
*/