import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.username || !input.email || !input.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        `${api}/api/users/register`,
        input
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
<div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-dark text-white text-center py-3 rounded-top-4">
              <h3 className="mb-0">Sign Up</h3>
            </div>
            <div className="card-body p-4 bg-light">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    className="form-control rounded-3"
                    id="username"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    className="form-control rounded-3"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    className="form-control rounded-3"
                    id="password"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-2 rounded-3 fw-semibold shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center bg-white py-3 rounded-bottom-4">
              <p className="mb-0 small">
                Already have an account?{" "}
                <a href="/login" className="fw-semibold text-dark">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
