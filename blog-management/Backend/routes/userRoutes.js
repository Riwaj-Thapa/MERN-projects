import express from "express";
const router = express.Router();
import { userLogin,userRegistration } from "../controller/usersController.js";

router.post("/register",userRegistration);

router.post("/login",userLogin);



export default router;
