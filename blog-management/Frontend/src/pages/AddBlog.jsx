import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/categories/getCategories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
  }, []);



  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("description", input.description);
    formData.append("thumbnail", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/blogs/addBlog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add blog.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Add a New Blog</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
                className="form-control"
                id="title"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                name="category"
                value={input.category}
                onChange={handleChange}
                required
              >
                {!categories || categories.length === 0 ? (
                  <option disabled>No categories available</option>
                ) : (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleChange}
                className="form-control"
                id="description"
                rows="4"
                placeholder="Enter blog description"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
                className="form-control"
                id="thumbnail"
                accept="image/*"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-dark btn-dark w-100"
              >
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
