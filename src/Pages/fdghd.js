import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // async function submit(e) {
  //   e.preventDefault();

  //   try {
  //     await axios
  //       .post("http://localhost:8000/", { email, password })
  //       .then((res) => {
  //         if ((res.data = "exist")) {
  //           // navigate("/Home", { state: { id: email } });
  //           navigate("/");
  //         } else if ((res.data = "notexist")) {
  //           alert("User is not logged up");
  //         }
  //       })
  //       .catch((e) => {
  //         alert("Wrong Details");
  //         console.log(e);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div className="fullScreen ">
      <div className="parentContainer bg-[#fdf8f8] p-0 w-4/5 h-2/5 absolute top-2/4 left-1/2 m-auto shadow-lg rounded-[2%]">
        <h1 className="liText"> Log In</h1>
        <div className="inputBoxes">
          <form>
            {/* action="POST" */}
            <input
              className="emailContainer"
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
              className="passContainer"
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
            <br />
            <br />
            <br />

            {/* <input type="submit" onClick={submit} /> */}
            <div>
              <button className="submitBtn">Submit</button>
            </div>
          </form>
        </div>

        <br />
        <br />

        {/* <Link to="/Signup"> Sign Up</Link> */}
      </div>
    </div>
  );
}

export default Login;
