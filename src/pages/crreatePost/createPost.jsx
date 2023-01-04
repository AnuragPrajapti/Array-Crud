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
import "./createPost.css";
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

const CreatePost = () => {
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

  const getAllUsersData = useSelector((state) =>
    state?.userData ? state?.userData : []
  );
  const successMessage = useSelector((state) => state?.message);
  const deleteMessage = useSelector((state) => state?.deleteMessage);
  const getEditDataById = useSelector((state) => state?.getEditDataById);
  const errorMessage = useSelector((state) => state?.errorMessage);
  const userData = useSelector((state) => state?.data);

  console.log(1111, getAllUsersData);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [userData]);

  useEffect(() => {
    if (deleteMessage) {
      toast.error(deleteMessage, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  }, [deleteMessage]);

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
    }
    reset();
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
      });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  }, [successMessage, errorMessage]);

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
    setValue("name", getEditDataById?.name);
    setValue("age", getEditDataById?.age);
    setValue("city", getEditDataById?.city);
  }, [getEditDataById]);

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
              {getAllUsersData.length > 0
                ? getAllUsersData?.map((item, index) => {
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
        <ToastContainer
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
    </div>
  );
};

export default CreatePost;
