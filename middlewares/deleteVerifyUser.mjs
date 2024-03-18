import userSchema from '../models/UserCollection.mjs'
import Ads from '../models/AdsCollection.mjs'

async function deleteVerifyUser(req, res, next) {
    const token = req.headers.authorization?.slice(7)

    if (!token) {
        res.status(401).send({ message: "No access!" })
        return
    }
    try {

        const tokenExists = await userSchema.findOne({ tokens: token }) //tokenUser ki details
        if (!tokenExists) {
            res.status(401).send({ message: "Invalid token!" })
            return
        }

        // For delete Ads Verification
        const tokenExistsInAds = await Ads.findOne({ _id: req?.params?.id })//Product ki Detail
        if (tokenExists?._id != tokenExistsInAds?.uid) {// tokenUser_id!=="Product ki uid" delete not allowed
            res.status(401).send({ message: "You are not Allow to delete this Ad!" })
            return
        }

        next()

    } catch (error) {
        res.status(401).send({ message: "Invalid token!" })

    }
}

export default deleteVerifyUser
