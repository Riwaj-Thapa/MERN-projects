import express from "express";
const router = express.Router();
import { getCategory,addNewCategory } from "../controller/categoriesController.js";
import validateToken from "../middleware/validateToken.js";

// Check the athourized users only
router.use(validateToken);

// Routes for adding the new Category
router.post("/addCategory",addNewCategory);

// Routes for getting the Category
router.get("/getCategories",getCategory);

export default router;