import express from "express";
import dotenv from "dotenv";
import userRouters from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import connectdb from "./config/dbConfiguration.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT;
connectdb();

// React app origin
app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Api routes for users
app.use("/api/users", userRouters);

// Api routes for blogs
app.use("/api/blogs", blogRoutes);

// Api routes for categories
app.use("/api/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
