import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import './login.css';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { getLoginUser } from '../../services/userSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [loader, setLoader] = useState(false);
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      dispatch(getLoginUser(data))
      reset();
      setLoader(true);
      setTimeout(() => {
         navigate('/dashboard')
      }, 2000)
   };

   setTimeout(() => {
      setLoader(false)
   }, 2000)

   return (
      <div className='login-container-wrapper' >
         <Container>
            <div className='login-form' >
               <Row>
                  <Col>
                     <p>Login Here!!</p>
                  </Col>
               </Row>
               <Row className='justify-content-center' >
                  <Col></Col>
                  <Col>
                     <Form className='form'
                        onSubmit={handleSubmit(onSubmit)}
                     >
                        <input type="email" placeholder='test@gmail.com'
                           {...register("email", { required: true })}
                        />
                        {errors.email?.type === "required" && (
                           <span className="error-style">spanlease enter email...</span>
                        )}

                        <input type="password" placeholder='********'
                           {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && (
                           <span className="error-style">Please enter password...</span>
                        )}
                        {loader ? (
                           <Spinner animation="border" />
                        ) : (
                           <Button className='login-button' type='sumbit' >Login</Button>)}

                        <div className="mt-3" style={{ color: "white" }} >
                           Don't Have an Accout? {"  "}
                           <span>
                              <Link to="/" >Register Now</Link>
                           </span>
                        </div>
                     </Form>
                  </Col>
                  <Col></Col>
               </Row>
            </div>
         </Container>
      </div>
   )
}

export default LoginForm;