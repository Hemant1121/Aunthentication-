const server = require('./server');
const express = require("express");
const mongoose = require('mongoose');
const url = 'mongodb://localhost/login'
const port = 3000;

const app = express();
app.use(express.json());
app.use('/',server);


//connect to database
mongoose.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true });
const con = mongoose.connection

con.on('open',(req,res)=>{
    console.log("Database is connected");
})

app.listen(port,()=>{
    console.log(`App is running Under ${port}`);
})