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
import "./style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ToastContainer, toast } from 'react-toastify';


const PostCrud = () => {
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
  const [getData, setGetData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [response, setResponse] = useState();

  const handleShow = () => {
    setShow(true);
  };

  const onSubmit = (postValue) => {
    setLoader(true);
    if (isEdit) {
      getData[response].title = postValue?.title;
      getData[response].description = postValue?.description;
      setShow(false);
      toast.success("Update Post Success",{
         position : "top-center",
      })
    } else {
      const data = [...getData, postValue];
      setGetData(data);
      setShow(false);
      // getData.push(postValue)
      toast.success("Add Post Success",{
        position : "top-center",
     })
    }
    reset();
  };
  const handleDelete = (id) => {
    //   console.log(555, id)
    getData.splice(id, 1);
    toast.warn("Delete Post",{
        position : "top-center",
     })
    reset();
  };

  // Edit Functionality
  const handleEdit = (id) => {
    setIsEdit(true);
    const editValue = getData[id];
    setValue("title", editValue?.title);
    setValue("description", editValue?.description);
    setResponse(id);
  };

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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              {getData.length > 0
                ? getData?.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <th>{index + 1}</th>
                          <th>{item?.title}</th>
                          <th>{item?.description}</th>
                          <td onClick={() => handleDelete(index)}>
                            <DeleteIcon style={{ color: "red" }} />
                          </td>
                          <td
                            onClick={() => {
                              handleEdit(index);
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
                  <Modal.Title>Add Post</Modal.Title>
                )}
              </Modal.Header>
              <Modal.Body>
                <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Enter_Title"
                  />
                  {errors.title?.type === "required" && (
                    <p
                      style={{
                        color: "red",
                        display: "block",
                        marginLeft: "20px",
                      }}
                    >
                      Please enter title...
                    </p>
                  )}
                  <input
                    type="text"
                    {...register("description", {
                      required: true,
                    })}
                    placeholder="Description"
                  />
                  {errors.description?.type === "required" && (
                    <p
                      style={{
                        color: "red",
                        display: "block",
                        marginLeft: "20px",
                      }}
                    >
                      Description is required
                    </p>
                  )}
                  {loader === true ? (
                    <Spinner animation="border" style={{ display : "block" }}  />
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

export default PostCrud;
