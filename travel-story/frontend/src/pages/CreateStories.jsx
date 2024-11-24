import React, { useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateStories = () => {
  const [location, setLocation] = useState("");
  const [countryName, setCountryName] = useState("");
  const [visitedYear, setVisitedYear] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null); // Change to null initially
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveStory = () => {
    if (!location || !countryName || !visitedYear || !description) {
      enqueueSnackbar("All fields must be filled", { variant: "error" });
      return; // Early return if any required field is missing
    }

    // Create a new FormData instance
    const formData = new FormData();
    formData.append("location", location);
    formData.append("countryName", countryName);
    formData.append("visitedYear", visitedYear);
    formData.append("description", description);

    if (photo) {
      formData.append("photo", photo);
    }

    axios
      .post("http://localhost:8000/stories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        enqueueSnackbar("Story Created successfully :)  ", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar("Error creating story", { variant: "error" });
        console.log("Error details:", error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center text-gray-500">Create Story</h1>
      <div className="flex flex-col border-2 border-gray-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Country Name</label>
          <input
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Visited Year</label>
          <input
            type="number"
            value={visitedYear}
            onChange={(e) => setVisitedYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <label className="text-xl mr-4 text-gray-500">Description</label>
        <textarea
          id="description"
          className="w-full p-2 mt-2 text-xl text-gray-700 border border-gray-300 rounded-lg"
          rows="4" // You can adjust the number of rows as needed
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-gray-400 m-8 hover:bg-gray-300" onClick={handleSaveStory}>
        Save
      </button>
      </div>
    
    </div>
  );
};

export default CreateStories;
