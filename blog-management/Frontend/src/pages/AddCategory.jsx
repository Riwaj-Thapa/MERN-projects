import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";

const AddCategory = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
  });

  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${api}/api/categories/addCategory`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add category.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Add a New Category</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleCategory}
            className="shadow p-4 bg-light rounded"
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="title"
                placeholder="Enter Category Title"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-dark btn-dark w-100"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
