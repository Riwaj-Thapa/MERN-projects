import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa"; // Example for location
import { FaGlobe } from "react-icons/fa"; // Example for country
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import StoryModel from "./StoryModel";

const StorySingleCard = ({ story }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {story.visitedYear}
      </h2>

      <div className="flex justify-start items-center gap-x-2">
        <FaMapMarkerAlt className="text-red-300 text-2xl" />
        <h2 className="my-1">{story.location}</h2>
      </div>

      {/* Image with smaller size */}
      <div className="my-4 w-full flex justify-left">
        <img
          src={`http://localhost:8000/${story.photo}`}
          alt={`Photo of ${story.photo}`}
          className="max-w-[200px] max-h-[150px] object-contain rounded-lg"
        />
      </div>

      <div className="flex justify-start items-center gap-x-2">
        <FaGlobe className="text-red-300 text-2xl" />
        <h2 className="my-1">{story.countryName}</h2>
      </div>

      <p className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 leading-relaxed">
        {story.description}
      </p>

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModel(true)}
        />
        <Link to={`/stories/details/${story._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/stories/edit/${story._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/stories/delete/${story._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>

      {showModel && (
        <StoryModel story={story} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default StorySingleCard;
