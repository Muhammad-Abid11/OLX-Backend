import express from "express";
import router from "./routes/index.mjs";
import db from './config/db.mjs'
import { PORT } from "./config/environment.mjs"
db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

const app = express()
const Port = 3001;
app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`)
})
app.use(express.json())//for POST-API--> k hamara data JSON format me receive hoga

app.use('/', router)