import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import AddCategory from "./pages/AddCategory.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import ProtectedRoute from "./services/ProtectedRoute.jsx";

const App = () => {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* Protected route */}
        <Route path="/" element={<ProtectedRoute/>}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addBlog" element={<AddBlog />}></Route>
          <Route path="/addCategory" element={<AddCategory />}></Route>
          <Route path="/blog/:id" element={<SingleBlog />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
