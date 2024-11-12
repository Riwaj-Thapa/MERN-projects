import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const ShowStory = () => {
  const [story, setStory] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/stories/${id}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl text-center text-gray-500 mb-6">Show Story</h1>

      <div className="flex justify-center items-center">
        <div className="flex flex-col border-2 border-gray-400 rounded-xl w-fit p-8">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Story ID : {story._id}
            </span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Location : {story.location}
            </span>
          </div>

          {story.photo && (
            <div className="my-4">
              <img
                src={`http://localhost:8000/${story.photo}`}
                alt="Story Photo"
                className="w-full max-w-md h-auto mt-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Country Name : {story.countryName}
            </span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Visited Year : {story.visitedYear}
            </span>
          </div>

          <div className="my-4">
            <label htmlFor="description" className="text-xl mr-4 text-gray-500">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 mt-2 text-xl text-gray-700 border border-gray-300 rounded-lg"
              rows="4"
              defaultValue={story.description}
              readOnly
            />
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Create Time: {new Date(story.createdAt).toString()}
            </span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Last Update Time: {new Date(story.updatedAt).toString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowStory;
