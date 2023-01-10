import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Table,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./dashboard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreatePost,
  getDeleteUser,
  getEditByUser,
  getUpdateUser,
  getUserData,
} from "../../services/userSlice";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    register,
    reset,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loader, setLoader] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [response, setResponse] = useState(false);
  const [isId, setIsId] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
   const navigate = useNavigate()
  console.log(state)

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [state?.data]);

  useEffect(() => {
    if (state?.deleteMessage) {
      toast.error(state?.deleteMessage, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  }, [state?.deleteMessage]);

  const onSubmit = (postValue) => {
    const updateData = { postValue, isId };
    setLoader(true);
    if (isEdit) {
      dispatch(getUpdateUser(updateData));
      dispatch(getUserData());
      setShow(false);
    } else {
      dispatch(getCreatePost(postValue));
      // dispatch(getUserData());
      setShow(false);
      if (state?.message) {
        toast.success(state?.message, {
          position: "top-center",
          autoClose: 1500
        });
      }
    }
    reset();
  };

  useEffect(() => {
    if (state?.message) {
      toast.success(state?.message, {
        position: "top-center",
      });
    }
    if (state?.errorMessage) {
      toast.error(state?.errorMessage, {
        position: "top-center",
        autoClose: 1500
      });
    }
  }, [state?.message, state?.errorMessage]);

  const handleDelete = (id) => {
    dispatch(getDeleteUser(id));
    dispatch(getUserData());
    reset();
  };

  // Edit Functionality
  const handleEdit = (id) => {
    setIsId(id);
    setIsEdit(true);
    dispatch(getEditByUser(id));
  };

  useEffect(() => {
    setValue("name", state?.getEditDataById?.name);
    setValue("age", state?.getEditDataById?.age);
    setValue("city", state?.getEditDataById?.city);
  }, [state?.getEditDataById]);



  const handleLogout = () =>{
    localStorage.removeItem("authToken")
    navigate('/')
  }

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  return (
    <div className="container-wrapper">
      <Container>
        <p>User_Post Details</p>
        <Button
          variant="primary"
          onClick={() => {
            handleShow();
            setIsEdit(false);
            reset();
          }}
        >
          AddPost
        </Button>
        <Row className="table-wrapper">
          <Col>
            {
              state?.loading ? <Spinner animation="border" variant="primary" /> :
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>City</th>
                      <th>Delete</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  {state?.userData.length > 0
                    ? state?.userData?.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <th>{index + 1}</th>
                            <th>{item?.name}</th>
                            <th>{item?.age}</th>
                            <th>{item?.city}</th>
                            <td onClick={() => handleDelete(item?._id)}>
                              <DeleteIcon style={{ color: "red" }} />
                            </td>
                            <td
                              onClick={() => {
                                handleEdit(item?._id);
                                handleShow();
                              }}
                            >
                              <BorderColorIcon style={{ color: "green" }} />
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                    : ""}
                </Table>
            }
            <p>
              secured Logout?{" "}
              <span><button onClick={()=>handleLogout()} className="logout-button" >logout</button> </span>{" "}
            </p>
          </Col>
        </Row>

        <Row className="form-wrapper">
          <Col>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                {isEdit ? (
                  <Modal.Title>Update Post</Modal.Title>
                ) : (
                  <Modal.Title>Create Post</Modal.Title>
                )}
              </Modal.Header>
              <Modal.Body>
                <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Enter Name"
                  />
                  {errors.name?.type === "required" && (
                    <p
                      style={{
                        color: "red",
                        display: "block",
                        marginLeft: "20px",
                      }}
                    >
                      Name is required
                    </p>
                  )}

                  <input
                    type="number"
                    {...register("age", {
                      required: true,
                    })}
                    placeholder="Enter Your Age"
                  />
                  {errors.age?.type === "required" && (
                    <p
                      style={{
                        color: "red",
                        display: "block",
                        marginLeft: "20px",
                      }}
                    >
                      Age is required
                    </p>
                  )}

                  <input
                    type="text"
                    {...register("city", {
                      required: true,
                    })}
                    placeholder="Enter City"
                  />
                  {errors.city?.type === "required" && (
                    <p
                      style={{
                        color: "red",
                        display: "block",
                        marginLeft: "20px",
                      }}
                    >
                      City is required
                    </p>
                  )}

                  {loader === true ? (
                    <Spinner animation="border" style={{ display: "block" }} />
                  ) : (
                    <div>
                      {" "}
                      {isEdit ? (
                        <Button className="form-button" type="submit">
                          Update Post
                        </Button>
                      ) : (
                        <Button className="form-button" type="submit">
                          Add Post
                        </Button>
                      )}{" "}
                    </div>
                  )}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <ToastContainer autoClose={1500} />
      </Container>
    </div>
  );
};

export default Dashboard;
