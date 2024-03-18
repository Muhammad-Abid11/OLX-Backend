import express from "express";
import Ads from '../models/AdsCollection.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'
import deleteVerifyUser from '../middlewares/deleteVerifyUser.mjs'
const router = express.Router()

// =================Get Request ///Get ALL Data from "MongoDB" by find()
//POST: localhost:3001/ads
router.get('/', async (req, res) => {
    const ads = await Ads.find()
    res.send({ message: 'Ads fetched successfully', data: ads })
})


//======Get ADs by ID /////Get Single Data from "MongoDB"
// router.get('/:id')

router.get('/:id', async (req, res) => {//is URL per hit kro  or yhn console wo "id" get hogi 
    console.log("req", req.params.id)
    const ID = req.params.id
    const ads = await Ads.findById(ID)
    res.send({ message: "Products ID Fetched.... ", ID, ads })
})

// =======================Post Request
// app.use(express.json()) <--add this line in main file

router.post('/post', verifyToken, async (req, res) => {
    try {
        const ad = new Ads(req.body)
        await ad.save()
        /* 
            try {
                const ad = await Ads.create(req.body);
                res.status(201).send({ message: "student added." })
            } catch (error) {
                res.status(500).send({ message: 'email should be unique', error: error });
            } 
        */
        res.send({ message: 'Ad posted successfully' })
    } catch (e) {
        res.send({ message: e.message })
    }
})

/* 
fetch('http://localhost:3001/ads/post',{
    method: 'POST',
  headers: {
    'Content-Type': 'application/json',
     Authorization:"Bearer TOKEN"
    },
  body: JSON.stringify({
    title:"Bolan",
    description:"New Bolan",
    amount:725000,
    uid:"72500Bolan"
  })
})
.then(res => res.json())
.then(res => console.log(res))

*/

// --------------------x----------------
// ============API-Put-Request (Update)
router.put("/put/:id", verifyToken, async (req, res) => {
    try {
        console.log("req", req.body)
        console.log("req params", req.params)
        const result = await Ads.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
        res.send({ message: "Product updated successfully" })

    } catch (error) {
        res.send({ message: e.message })
    }

})

/* 
fetch('http://localhost:3001/ads/put/65f768c2fc3db3b760ac78a6',{ 
    method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      title: 'Corolla',
      description: 'Corolla 2021',
  })
})
.then(res => res.json())
.then(res => console.log(res))


*/

// --------------------x----------------


//=======API-Delete-Request 

router.delete("/delete/:id", deleteVerifyUser, async (req, res) => {

    try {
        const result = await Ads.deleteOne({ "_id": req.params.id })
        res.send({ message: "Product deleted successfully", result })
    } catch (e) {
        res.send({ message: e.message })
    }
})

/* 
fetch('http://localhost:3001/ads/delete/65e0fbea50d1eb3ea508c487', {
  method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
     Authorization:"Bearer TOKEN"
    },
})
.then(res => res.json()) // or res.json()
.then(res => console.log(res))
*/

export default router