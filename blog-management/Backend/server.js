// import express from "express";
// import dotenv from "dotenv";
// import userRouters from "./routes/userRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import connectdb from "./config/dbConfiguration.js";
// import cors from "cors";
// dotenv.config();

// const app = express();
// const port = process.env.PORT;
// connectdb();

// // Enable CORS for all origins
// app.use(
//   cors({
//     origin: "*", // allow any origin
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());

// app.use("/uploads", express.static("uploads"));

// // Api routes for users
// app.use("/api/users", userRouters);

// // Api routes for blogs
// app.use("/api/blogs", blogRoutes);

// // Api routes for categories
// app.use("/api/categories", categoryRoutes);

// // for testing
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.listen(port, () => {
//   console.log(`App is running on http://localhost:${port}`);
// });




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./config/dbConfiguration.js";
import userRouters from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectdb();

// -------------------- MIDDLEWARE -------------------- //

// Enable CORS for all origins
app.use(
  cors({
    origin: "*", // allow all origins, can restrict later
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- ROUTES -------------------- //

// Health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API routes
app.use("/api/users", userRouters);
app.use("/api/blogs", blogRoutes);       // blog routes should handle ImageKit upload internally
app.use("/api/categories", categoryRoutes);

// -------------------- START SERVER -------------------- //

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
