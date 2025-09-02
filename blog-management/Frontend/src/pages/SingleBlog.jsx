import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api.js";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchingSingleBlog = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${api}/api/blogs/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(res.data);
    };
    fetchingSingleBlog();
  }, [id]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <div className="card shadow-lg rounded">
            <div className="card-header text-center ">
              <h1 className="my-4">{blog.title}</h1>
            </div>

            <img
              src={`${api}/${blog.thumbnail}`}
              className="img-fluid rounded mx-auto d-block my-4"
              alt={blog.title}
              style={{ height: "400px", width: "550px", objectFit: "cover" }}
            />

            <div className="card-body">
              <p className="lead text-dark">Description : {blog.description}</p>
            </div>

            <div className="card-footer text-center">
              <button onClick={() => navigate("/")} className="btn btn-dark">
                🔙 Back to Blogs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
