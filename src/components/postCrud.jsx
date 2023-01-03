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
    if (isEdit) {
      getData[response].title = postValue?.title;
      getData[response].description = postValue?.description;
    } else {
      const data = [...getData, postValue];
      setGetData(data);
      // getData.push(postValue)
    }
    reset();
  };
  const handleDelete = (id) => {
    //   console.log(555, id)
    getData.splice(id, 1);
    alert("Delete User");
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
          Add_Post
        </Button>
        <Row className="table-wrapper">
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Post-Id</th>
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
                          <th>{index}</th>
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
                  <Modal.Title>Update_Post</Modal.Title>
                ) : (
                  <Modal.Title>Add_Post</Modal.Title>
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
                  {isEdit ? (
                    <Button className="form-button" type="submit">
                      Update_Post
                    </Button>
                  ) : (
                    <Button className="form-button" type="submit">
                      Add_Post
                    </Button>
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
      </Container>
    </div>
  );
};

export default PostCrud;
