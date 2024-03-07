import { SignupInput } from "@pruthvidev10/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      const authorId = response.data.id;
      localStorage.setItem("token", jwt);
      localStorage.setItem("authorId", authorId);
      toast.success("Succesfully Login", {
        onClose: () => navigate('/blogs')
      })

    } catch (e) {
      toast.error("Invalid Credentials")
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <ToastContainer hideProgressBar={true} autoClose={500}/>
      <div className="flex flex-col p-2 text-center">
        <h1 className="font-bold text-3xl">Create an Account</h1>
        <h4 className="text-xl text-gray-500 font-md">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="ml-2 underline"
          >
            {type === "signup" ? "sign in" : "sign up"}
          </Link>
        </h4>
      </div>
      <div>
        {type === "signin" ? null : (
          <LabelledInput
            label="Name"
            placeholder="tony123"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
          />
        )}
        <LabelledInput
          label="Username"
          placeholder="tony@gmail.com"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              username: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Password"
          placeholder="12345"
          type="password"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
        />
        <button
          className="w-full  bg-black text-white p-2 rounded-xl my-3"
          onClick={sendRequest}
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
