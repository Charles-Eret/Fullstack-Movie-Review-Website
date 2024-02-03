import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ijxepk2.mongodb.net/?retryWrites=true&w=majority`
const port = 8000

MongoClient.connect(
  uri, 
  {
    //options for mongoclient
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  //for catching errors
  .catch(err => {
    console.error(err.stack)
    //ends program
    process.exit(1)
  })
  //async for making sure this happens in right order, client is returned from connecting to the database
  .then(async client => {
    //sending database connection to ReviewsDAO
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
