require('dotenv').config({ path: '../loging-middleware/.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const { Log } = require('../loging-middleware/logginMiddelware')
const linkShortnerRoutes = require('./routes/linkShortnerRoutes')
const connectDB = require('./connectDB/connect')

app.use(cors(
    {
        origin: ['http://localhost:5173'],
        credentials: true,
    }
));
app.use(express.json())

app.get('/test', async (req, res) => {
    await Log("backend", "error", "handler", "Simulated failure occurred.");
    res.status(500).send("Simulated failure occurred.");
})
app.use('/api/v1/links', linkShortnerRoutes)



const start = async () => {
    try {
        console.log();
        
        await connectDB(process.env.MONGO_URI)
        app.listen(4000, () => {
            console.log("server is running on port 4000")
        })
    } catch (error) {
        console.log(error)
    }
}

start()