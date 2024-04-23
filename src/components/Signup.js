import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/Signup", { email, password })
        .then((res) => {
          if ((res.data = "exist")) {
            alert("User already exists");
          } else if ((res.data = "notexist")) {
            history("/Home", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("Wrong Details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="fullScreen">
      <div className="parentContainer">
        <h1 className="liText"> Sign Up</h1>
        <div className="inputBoxes">
          <form action="POST">
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              name=""
              id=""
            />
            <br />

            <br />

            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              name=""
              id=""
            />
            <br />
            <br />

            <input type="submit" onClick={submit} />
          </form>
        </div>

        <br />
        <p> OR</p>
        <br />
        <Link to="/"> Login Page</Link>
      </div>
    </div>
  );
}

export default Signup;
