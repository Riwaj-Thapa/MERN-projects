import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateStories from "./pages/CreateStories";
import ShowStory from "./pages/ShowStory";
import EditStory from "./pages/EditStory";
import Home from "./pages/Home";
import DeleteStory from "./pages/DeleteStory";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/stories/create' element={<CreateStories />} />
      <Route path='/stories/details/:id' element={<ShowStory />} />
      <Route path='/stories/edit/:id' element={<EditStory />} />
      <Route path='/stories/delete/:id' element={<DeleteStory />} />
    </Routes>
  );
};

export default App;


