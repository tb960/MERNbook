const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
let User = require('../schemas/User');
const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar');


router.post('/register', 
    [
        check('name', 'Name is empty').not().isEmpty(),
        check('lastName', 'Last Name is empty').not().isEmpty(),
        check('userName', 'Username is empty').not().isEmpty(),
        check('email', 'E-mail is empty').isEmail(),
        check('password','Passwords needs to contain 6 letters and less than 12').isLength({min: 6, max: 12})
    ],
    async(req,  res) =>{
    try{
        let { name,lastName,userName,email,password } = req.body;
        let user = await User.findOne({ email }).select("password");
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        if(user){
            return res.status(401).send("User has already been created!");
        }

        const avatar = gravatar.url(email,{
            r: 'pg',
            d: 'mm',
            s: '200',
        });

        let newUser = new User({
            name,
            lastName,
            userName,
            email,
            password,
            avatar,
        });

        const salt = await bcryptjs.genSalt(10);

        let hashedPassword = await bcryptjs.hash(password,salt);

        newUser.password = hashedPassword;

        await newUser.save();

        res.send("user registered!");
    }
    catch(error){
        console.log(error.message);
        return res.statusCode(500).send("Server error.");
    }
})

module.exports = router