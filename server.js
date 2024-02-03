import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

app.use(cors())
//will allow server to accept json in the body of a request 
app.use(express.json())

app.use("/api/v1/reviews", reviews)
//for any url not in routes
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app
