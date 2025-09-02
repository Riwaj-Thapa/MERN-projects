import express from "express";
const router = express.Router();
import {
  getAllBlogs,
  getSingleBlog,
  addNewBlog,
} from "../controller/blogController.js";
import validateToken from "../middleware/validateToken.js";
import { upload } from "../config/multerConfig.js";

// Check the authorized user.
router.use(validateToken);

// Route for adding new post.
router.post("/addBlog", upload.single("thumbnail"), addNewBlog);

// Route for getting all blogs.
router.get("/allBlogs", getAllBlogs);

// Route for getting single blog.
router.get("/blog/:id", getSingleBlog);

export default router;
