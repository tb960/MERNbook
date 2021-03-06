const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
let User = require('../schemas/User');
const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('config');
const jwt = require('jsonwebtoken');
const authentication = require("../middleware/authentication.js");


//this authentication middleware is such that, whenever the user sign up, we will create a jsonwebToken for the user
//and then everytime when user try to sign in and want to access to their data we will use this jsonWebToken provided to verify the user
//we also use this token to find the user in the database
//for example, user A sign up, we will give them a token, then we will need to store the token in the database
//and then whenever the user try to get to the "/" route, the user need to provide their web token 
//and we will use this decoded file to look for the user details in the database, only the user detail should return to api request
router.get("/", authentication, async(req,res)=>{
    try{
        let user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch(error){
        console.error(error.message);
        return res.status(500).send("Server error...");
    }
});

router.get("/users", async (req,res)=>{
    try {
        let users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error...");
    }
});

router.get("/get_user_by_email/:user_email", async (req,res)=>{
    try {
        let userEmail = req.params.user_email;
        let user = await User.findOne({ email: userEmail}).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error...");
    }
})

router.get("/get_user_by_id/:user_id", async (req,res)=>{
    try {
        let userId = req.params.user_id;
        let user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error...");
    }
})



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
        //this line search through the database and search whether the email exist in the database or not
        let user = await User.findOne({ email }).select("-password");
        let fetchedUserNameFromDatabase = await User.findOne({ userName }).select("-password");
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        if(user){
            return res.status(401).send("User has already been created!");
        }
        
        if(fetchedUserNameFromDatabase){
            return res.status(401).send("User name has already been taken!");
        }

        const avatar = gravatar.url(email,{
            r: 'pg',
            d: 'mm',
            s: '200',
        });

        //this one is to turn all the user into an json object to pass into the database
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

        const payload = {
            user: {
                id: newUser._id,
            },
        };

        jwt.sign(
            payload,
            config.get("jsonWebTokenSecret"), 
            {expiresIn: 3600}, 
            (err, token) =>{
                if(err) throw err;
                res.json({ token });
            }
        );
    }
    catch(error){
        console.error(error.message);
        return res.statusCode(500).send("Server error.");
    }
});

router.post('/login', 
    [
        check('email', 'E-mail is empty').isEmail(),
        check('password','Passwords needs to contain 6 letters and less than 12').isLength({min: 6, max: 12})
    ],
    async(req,  res) =>{
    try{
        let { email,password } = req.body;
        //this line search through the database and search whether the email exist in the database or not
        let user = await User.findOne({ email }).select("password");
        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        if(!user){
            return res.status(404).send("User with this email has not been created!");
        }

        let doPasswordMatch = await bcryptjs.compare(password, user.password);

        if(!doPasswordMatch){
            return res.status(401).send("Password do not match");
        }

        console.log("user signed in");

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            config.get("jsonWebTokenSecret"), 
            {expiresIn: 3600}, 
            (err, token) =>{
                if(err) throw err;
                res.json({ token });
            }
        );
    }
    catch(error){
        console.error(error.message);
        return res.status(500).send("Server error.");
    }
})

router.put('/change_user_data', 
    authentication, 
    [check("changeUserData", "Input is empty").not().isEmpty()],
    async(req,res) =>{
        try {
            let { userNameFromSearch } = req.body;

            let errors = validationResult(req);

            if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

            let users = await User.find().select("-password");

            let findUserByUsername = users.filter(
            (user) =>
                user.userName.toString().toLowerCase().split(" ").join("") ===
                userNameFromSearch.toString().toLowerCase().split(" ").join("")
            );
            res.json(findUserByUsername);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error...");
        }

});

router.put('/change_user_data/:user_data_to_change', 
    authentication,
    [check('changeUserData', "Search is empty").not().isEmpty()], 
    async(req,res) =>{
        try {
            const { changeUserData } = req.body;
            const errors = validationResult(req);
            let user = await User.findById(req.user.id).select("-password");
        
            if (!errors.isEmpty())
              return res.status(400).json({ errors: errors.array() });
        
            if (!user) return res.status(404).json("User not found");
        
            //userDataToChange -> name,lastName,userName
        
            let userDataToChange = req.params.user_data_to_change.toString();
        
            if (user[userDataToChange] === changeUserData.toString())
              return res
                .status(401)
                .json("This is the same data that is already in database");
        
            user[userDataToChange] = changeUserData.toString();
        
            await user.save();
        
            res.json("Data is changed");
          } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
          }
});

router.put('./check_actual_password',
    authentication,
    [
        check('passwordToCheck','Password had to be 6 letter and below 12').isLength({ min: 6, max: 12})
    ],
    async (req,res)=>{
        try {
            const { passwordToCheck } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
            let user = await User.findById(req.user.id);

            let doPasswordsMatch = await bcryptjs.compare(
                passwordToCheck,
                user.password
            );

            if (!doPasswordsMatch)
            return res.status(401).json("Passwords do not match");

            res.json("success");
            
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
        }
    });


router.put('./change_user_password',
    authentication,
    [
        check('newPassword', 'New password should be 6 letter and below 12').isLength({ min: 6, max: 12})
    ],
    async (req,res) =>{
        try {
            const { newPassword } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
            let user = await User.findById(req.user.id);

            const salt = await bcryptjs.genSalt(10);

            const hashedPassword = await bcryptjs.hash(newPassword, salt);

            user.password = hashedPassword;

            await user.save();

            res.json("Success");
            
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
        }
    });


module.exports = router