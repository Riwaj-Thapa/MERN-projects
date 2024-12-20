const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc register a user
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username,password,email}=req.body;
    if(!username || !password || !email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered! ");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashpassword :",hashedPassword)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,

    });

    if(user){
        res.status(201).json({_id: user.id, email:user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }


    res.json({message: "Register the user"});
});

//@desc login user
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}= req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All feilds are mandotory ! ");
    }
    const user = await User.findOne({email});
    
    //Comparing password with hashed password
    
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        },process.env.ACCESS_TOKEN_SECERT,
        {expiresIn: "30m"}

    )
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }   
});

//@desc Current user information
//@route POST /api/user
//@access private

const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});



module.exports = {registerUser,loginUser,currentUser}
