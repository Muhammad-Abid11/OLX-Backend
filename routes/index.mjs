import express from "express";
import ads from './ads.mjs'
import users from './user.mjs'
const router = express.Router()
router.get('/', (req, res) => {
    res.write("<p>/users</p>")
    res.write("/ads")
    res.send()
})
router.use('/ads', ads)
router.use('/users', users)
export default router