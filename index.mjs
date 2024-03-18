import express from "express";
import cors from 'cors';
import router from "./routes/index.mjs";
import db from './config/db.mjs'
import { PORT } from "./config/environment.mjs"
db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

const app = express()
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
app.use(cors({
    origin: `http://localhost:${PORT}`, // Allow requests from localhost:3000
    credentials: true // Enable sending cookies with CORS requests
}));
app.use(express.json())

app.use('/', router)