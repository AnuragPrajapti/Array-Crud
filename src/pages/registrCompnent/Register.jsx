import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import img from "../../assets/img.webp";
import "./Register.css";
import { NavLink } from "react-router-dom";
import { Button, Spinner, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRegisterUser } from "../../services/userSlice";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const state = useSelector(state => state)
  const [message, setMessage] = useState(state.message)

  console.log(222, state);


  const onSubmit = (data) => {
    console.log(111, data)
    dispatch(getRegisterUser(data))
    reset();
    setLoader(true);
  };

  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 1500,
      })
    }
    setMessage("")
  }, [message])


  //Spinner Functionality
  setTimeout(() => {
    setLoader(false);
  }, 3000);

  return (
    <Container>
      <div className="register">
        <div className="registerForm">
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>Register Here!!</h2>
            <hr></hr>
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="FullName"
            />
            {errors.firstName?.type === "required" && (
              <p className="error-style">Please enter FullName...</p>
            )}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="test@gmail.com"
            />
            {errors.email?.type === "required" && (
              <p className="error-style">Please enter email...</p>
            )}
            <input
              type="password"
              {...register("password", { required: true, maxLength: 8 })}
              placeholder="password"
            />
            {errors.password?.type === "required" && (
              <p className="error-style">Please enter password...</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="error-style">Password maxLength is 8</p>
            )}
            <input type="test" {...register("address", { required: true })} placeholder="Enter Address" />
            {errors.address?.type === "required" && (
              <p className="error-style">Please enter address...</p>
            )}
            <input
              type="number"
              {...register("number", {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
              placeholder="mobile number"
            />
            {errors.number?.type === "required" && (
              <p className="error-style">Mobile Number is required</p>
            )}
            {errors.number?.type === "minLength" && (
              <p className="error-style">min Length Exceed</p>
            )}
            {errors.number?.type === "maxLength" && (
              <p className="error-style">Max Length Exceed </p>
            )}
            {loader ? (
              <Spinner animation="border" />
            ) : (
              <Button className="btn" type="submit" >Register</Button>
            )}
            <p className="mt-3">
              Alredy Have an Accout?
              <span>
                <NavLink to="/login">Login</NavLink>
              </span>{" "}
            </p>
          </form>
        </div>
        <div className="registerImage">
          <img src={img} alt="img" />
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
