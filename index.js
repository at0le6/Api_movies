import app from './app.js'
import  database  from './database.js'

const port = process.env.PORT || 4000;

const start=async()=>{
    try {
        const test=await database("film")
        if(test.length==0)throw ("Error on databse")
        console.log("DB connected")
        app.listen(port)
        console.log("Server started on port:",port)
    } catch (error) {
        console.error(error)
    }
}
start()