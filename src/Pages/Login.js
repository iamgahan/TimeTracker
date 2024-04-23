import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Validations from "../Validation";

const credentials = {
  email: "iamgahan@gmail.com",
  password: "1234",
};

function Login(props) {
  const navigate = useNavigate();
  const { setToken } = props;
  const [errors, setError] = useState({});
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const imgUrl =
    "https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-23%2018-47-57.png?alt=media&token=1fab8603-9b12-470e-935c-5ad02908eb14";

  useEffect(() => {
    if (props.token) {
      console.log("Already has token so need to go to login");
      navigate("/dashboard");
    }
  }, [props.token]);

  const handleLogin = (e) => {
    e.preventDefault();
    // alert("Invalid credentials");

    // setError(Validations(email, password));
    if (email === credentials.email && password === credentials.password) {
      props.setToken("abcdefghijklmnopqrstuvwxy");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className=" flex flex-col bg-[#f2f2f2] justify-center items-center  w-screen h-screen">
      <img src={imgUrl} alt="Not-found"></img>
      <form
        onSubmit={handleLogin}
        className="parentContainer flex flex-col border  w-3/12 p-6 bg-[#fdf8f8] shadow-xl rounded-lg"
      >
        <div className="h-1/6 w-full text-slate-600 font-bold text-start px-2 py-2 ">
          Log in
        </div>
        <div className="inputBoxes flex-col flex text-sm bg-[#fdf8f8] w-full space-y-4 h-3/6 ">
          <input
            className="emailContainer bg-[#f2f2f2] px-2 py-2 "
            type="email"
            autoComplete="true"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email "
            name=""
            id=""
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "13px" }}> {errors.email}</p>
          )}

          <input
            className="passContainer bg-[#f2f2f2] px-2 py-2"
            type="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            name=""
            id=""
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "13px" }}> {errors.password}</p>
          )}
        </div>

        <div className="flex justify-between text-xs py-5 ">
          <span className="text-slate-600 font-sm text-xs px-.5  ">
            <input type="checkbox" className="m-2"></input>
            Stay logged in
          </span>
          <Link className="text-cyan-500 underline px-1 py-2">
            <span>Forgot Password</span>
          </Link>
        </div>

        <div className=" flex items-center submitButton bg-[#fdf8f8]-500 w-full h-2/6 pr-3 pl-3 pt-4s pb-6 ">
          <button
            className="submitBtn bg-teal-500 w-full  text-white rounded-md "
            type="submit"
            // onClick={handleLogin}
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
