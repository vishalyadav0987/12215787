require('dotenv').config({ path: '../loging-middleware/.env' });
const express = require('express');
const app = express();
const {Log} = require('../loging-middleware/logginMiddelware')



app.get('/test',async(req,res)=>{
     await Log("backend", "error", "handler", "Simulated failure occurred.");
     res.status(500).send("Simulated failure occurred.");
})

app.listen(4000,()=>{
    console.log("server is running on port 4000")
})