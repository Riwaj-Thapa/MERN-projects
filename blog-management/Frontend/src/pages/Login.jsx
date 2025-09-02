import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation before sending the request
    if (!input.email || !input.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        `${api}/api/users/login`, // Correct URL for login
        input
      );
      alert(res.data.message);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("username", res.data.name);
      navigate("/"); // Navigate after successful login
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
              <h3 className="mb-0">Login</h3>
            </div>
            <div className="card-body p-4 bg-light">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
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
                    placeholder="Enter Email"
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
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <a href="/forgot-password" className="small text-muted">
                    Forgot password?
                  </a>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-2 rounded-3 fw-semibold shadow-sm"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center bg-white py-3 rounded-bottom-4">
              <p className="mb-0 small">
                Don’t have an account?{" "}
                <a href="/register" className="fw-semibold text-dark">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
