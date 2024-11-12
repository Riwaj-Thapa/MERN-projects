import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:8000/api/users/register",
        input
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container shadow p-4 mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Sign Up</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            className="form-control"
            id="username"
            placeholder="Enter Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            className="form-control"
            id="email"
            placeholder="Enter Email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
            className="form-control"
            id="password"
            placeholder="Enter Password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100 mt-3"
          style={{ backgroundColor: "#333", borderColor: "#333" }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
