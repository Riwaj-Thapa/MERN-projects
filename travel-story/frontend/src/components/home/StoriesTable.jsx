import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";


const StoriesTable = ({ stories }) => {
  return (
    <table className="w-full table-fixed bg-gray-300 shadow-lg rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-200 text-gray-700 text-left">
          <th className="p-2 border-b border-gray-300 rounded-tl-md">#</th>
          <th className="p-2 border-b border-gray-300">Location</th>
          <th className="p-2 border-b border-gray-300 max-md:hidden">
            Country Name
          </th>
          <th className="p-2 border-b border-gray-300 max-md:hidden">
            Visited Year
          </th>
          <th className="p-2 border-b border-gray-300 rounded-tr-md">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {stories.map((story, index) => (
          <tr
            key={story._id}
            className="bg-white border-b hover:bg-blue-50 transition-colors duration-200"
          >
            <td className="p-2 text-left">{index + 1}</td>
            <td className="p-2 text-left">{story.location}</td>
            <td className="p-2 text-left max-md:hidden">
              {story.countryName}
            </td>
            <td className="p-2 text-left max-md:hidden">
              {story.visitedYear}
            </td>
            <td className="p-2 text-left">
              <div className="flex justify-left space-x-4">
                <Link
                  to={`/stories/details/${story._id}`}
                  className="text-green-600 hover:text-green-500"
                >
                  <FaEye  className="text-xl" />
                </Link>
                <Link
                  to={`/stories/edit/${story._id}`}
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  <FaEdit className="text-xl" />
                </Link>
                <Link
                  to={`/stories/delete/${story._id}`}
                  className="text-red-600 hover:text-red-500"
                >
                  <FaTrash className="text-xl" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StoriesTable;
