const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToDatabase');

connectToDatabase();

let PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
});
