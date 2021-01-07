const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToDatabase');
const cors = require("cors");
//prevent warning of what??

app.use(cors());
app.use(express.json({extended: false})); //allow us to send body-parser request, this one is used to replace body-parsesr

connectToDatabase();

//Routes
app.use('/api/posts',require('./routes/posts.js'));
app.use('/api/users',require('./routes/users.js'));

app.get('/',(req,res) => {
    res.send('App is working congratulations!');
})

let PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
});
