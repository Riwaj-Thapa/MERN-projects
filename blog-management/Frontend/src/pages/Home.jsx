import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        const res = await axios.get(
          `${api}/api/blogs/allBlogs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched blogs data:", res.data); // Log data to check the structure
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlog();
  }, []);

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest posts</strong>
            </h2>

            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={item._id}>
                    <div className="card h-100 shadow-sm border-0 rounded-3">
                      <img
                        src={`${api}/${item.thumbnail}`}
                        className="card-img-top img-fluid"
                        alt="blog thumbnail"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold text-truncate">
                          {item.title}
                        </h5>
                        <p className="card-text text-muted small flex-grow-1">
                          {item.description.length > 80
                            ? item.description.substring(0, 80) + "..."
                            : item.description}
                        </p>
                        <Link
                          to={`/blog/${item._id}`}
                          className="btn btn-dark mt-auto align-self-start"
                        >
                          View more...
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center text-muted">No Blogs yet :(</h2>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
