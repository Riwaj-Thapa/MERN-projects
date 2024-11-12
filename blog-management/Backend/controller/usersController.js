import userModel from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();


const userRegistration = async(req,res)=>{

    const {username,email,password}= req.body;
    try{
        if(username && email && password){
            const isUser = await userModel.findOne({email:email});
            if(!isUser){
                // password hasing
                const genSalt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, genSalt)

                // Save a user
                const newUser = new userModel({
                    username,
                    email,
                    password:hashedPassword,
                });
                const savedUser = await newUser.save();
                if(savedUser){
                    return res.status(200).json({message:"User registered successfully :) "})
                }

            }else{
                return res.status(400).json({message:"User with this email already exist :("})
            }
            
        }else{
            return res.status(400).json({message:"All feilds are required"})

        }


    }catch(error){

        return res.status(400).json({message:error.message})

    }

};


const userLogin = async (req, res) => {
    const { email, password } = req.body;


    try {
        // Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            { userID: user._id},
            
            process.env.ACCESS_TOKEN_SECRET, // Ensure this variable is set in your environment
            { expiresIn: "2d" }
        );

        return res.status(200).json({ accessToken, message: "Login successful", name:user.username});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export {userRegistration,userLogin};
