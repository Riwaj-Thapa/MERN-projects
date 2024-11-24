import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditStory = () => {
  const [location, setLocation] = useState("");
  const [countryName, setCountryName] = useState("");
  const [visitedYear, setVisitedYear] = useState("");
  const [description, setDescription] = useState("");
  const [photo,setPhoto] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/stories/${id}`)
      .then((response) => {
        setLocation(response.data.location);
        setCountryName(response.data.countryName);
        setVisitedYear(response.data.visitedYear);
        setDescription(response.data.description);
        setPhoto(response.data.photo)
      })
      .catch((error) => {
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  }, []);

  const handleEditStory = () => {
    const data = {
      location,
      countryName,
      visitedYear,
      description,
      photo,
    };
    axios
      .put(`http://localhost:8000/stories/${id}`, data)
      .then(() => {
        enqueueSnackbar("Story Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center text-gray-500">Edit Story</h1>
      <div className="flex flex-col border-2 border-gray-500 rounded-xl w-[600px] p-4 mx-auto">
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
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Visited Year</label>
          <input
            type="number"
            value={visitedYear}
            onChange={(e) => setVisitedYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            id="description"
            className="w-full p-2 mt-2 text-xl text-gray-700 border border-gray-300 rounded-lg"
            rows="4" // You can adjust the number of rows as needed
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="p-2 bg-gray-300 m-8 hover:bg-gray-200" onClick={handleEditStory}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditStory;
