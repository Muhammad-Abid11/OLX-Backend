import jwt from 'jsonwebtoken'
import userSchema from '../models/UserCollection.mjs'

import jwtSecret from '../config/jwt.mjs'

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7)

    if (!token) {
        res.status(401).send({ message: "No access!" })
        return
    }

    try {

        const tokenExists = await userSchema.findOne({ tokens: token })
        if (!tokenExists) {
            res.status(401).send({ message: "Invalid token!" })
            return
        }

        const decoded = jwt.verify(token, jwtSecret)
        // console.log("decoded verifyPage", decoded)
        req.body.uid = decoded._id //for adsPost ta k ads post hone sy pehly usme "user" ki "uid" save hojaye
        req.body.name = tokenExists.name //for adsPost ta k ads post hone sy pehly usme "user" k "name" save hojaye
        req.userId = decoded._id//for logout
        req.tokenToRemove = token//for logout

        next()
    } catch (e) {
        res.status(401).send({ message: "Invalid token!" })
    }
}

export default verifyToken



/* 

ads get done
ads post private done
ads update private done
ads delete private done

login done
register done
logout private done

.env done
vercel deploy done
*/