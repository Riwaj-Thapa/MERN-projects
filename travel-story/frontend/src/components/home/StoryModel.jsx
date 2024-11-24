import { AiOutlineClose } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa"; // Example for location
import { FaGlobe } from "react-icons/fa"; // Example for country

const StoryModel = ({ story, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-40 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="story-card">
        <div
          onClick={(event) => event.stopPropagation()}
          className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
        >
          <AiOutlineClose
            className="absolute right-6 top-6 text-3xl text-red-700 cursor-pointer"
            onClick={onClose}
          />

          <div className="flex gap-x-2">
            <span className="font-semibold text-gray-600">Date Visited:</span>
            <span className="text-gray-800">{story.visitedYear}</span>
          </div>

          <div className="flex gap-x-2 mt-2">
            <span className="font-semibold text-gray-600">Story ID:</span>
            <span className="text-gray-800">{story._id}</span>
          </div>
          {/* Location with Logo */}
          <div className="flex justify-start items-center gap-x-2">
            <FaMapMarkerAlt className="text-red-300 text-2xl" />
            {/* Location icon */}
            <h2 className="my-1">{story.location}</h2>
          </div>

          <div className="my-4 w-full flex justify-left">
            {/* Image with constrained size */}
            <img
              src={`http://localhost:8000/${story.photo}`}
              alt={`Photo of ${story.location}`}
              className="max-w-[300px] max-h-[200px] object-contain rounded-lg"
            />
          </div>

          {/* Country Name with Logo */}
          <div className="flex justify-start items-center gap-x-2">
            <FaGlobe className="text-red-300 text-2xl" /> {/* Country icon */}
            <h2 className="my-1">{story.countryName}</h2>
          </div>

          <div className="flex gap-x-2 mt-2">
            <span className="font-semibold text-gray-600">Description:</span>
            <span className="text-gray-800">{story.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModel;
