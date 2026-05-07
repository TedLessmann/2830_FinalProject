import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    fitnessGoal: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let response;

      if (isRegistering) {
        response = await API.post("/users/register", formData);
      } else {
        response = await API.post("/users/login", {
          email: formData.email,
          password: formData.password
        });
      }

      onLogin(response.data);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <section>
      <h1>{isRegistering ? "Create Account" : "Login"}</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
            <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />
            <input type="text" name="fitnessGoal" placeholder="Fitness goal" value={formData.fitnessGoal} onChange={handleChange} />
          </>
        )}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

        <button type="submit">{isRegistering ? "Register" : "Login"}</button>

        <button type="button" className="secondary-btn" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
        </button>
      </form>

    </section>
  );
}

export default Login;
