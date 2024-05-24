import React from "react";
import "./Feedback.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";

import CustomTable from "../CustomTable/CustomTable";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const Feedback = () => {

  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    feedback: ''
  });


  const changeHandler = (event) => {
    const {name, value} = event.target;

    setFormState((prevData)=> ({
      ...prevData,
      [name]: value
    }))
  }

  useEffect(()=>{
    getAllFeedback();
  }, [])

  const getAllFeedback = () => {
    fetch('http://localhost:5000/getAllFeedback')
    .then(response => {
      return response.json();
    })
    .then(users => {
      setUsers(users.feedback)
      console.log(users);
    })
    .catch(err =>{
      console.log(err);
    })
  }

    const registerHandler = () => {
        console.log("FormState: " ,formState)
        fetch('http://localhost:5000/createFeedback', {
          method: "POST",
          headers:{ "Content-Type": "application/json" },
          body: JSON.stringify(formState)
        })
        .then((response) =>{
          return response.json();
        })
        .then((data)=> {
          setFormState({
            firstName: '',
            lastName: '',
            email: '',
            feedback: ''
          })
          getAllFeedback();
          console.log(data)
        })
        .catch((error) => console.error(error));
      }

      const submitHandler = (event) => {
        event.preventDefault();
        if(id) {
          console.log("update part")
          updateHandler();
        }
        else {
          console.log("register part")
          registerHandler();
        }
      }


      const deleteHandler = (_id) => {
        console.log("Fetched ID: " ,_id)
        const id = { id: _id };
        fetch("http://localhost:5000/deleteFeedback", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(id)
        })
        .then((response) =>  {
         return response.json()
        })
        .then(data => {
          if(data.status == 200){
            getAllFeedback();
            setId("");
            setFormState({
              firstName: '',
              lastName: '',
              email: '',
              feedback: ''
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      }

      const updateIdHandler = (_id) => {
        setId(_id);
        fetch(`http://localhost:5000/getDataById/${_id}`)
        .then(response => {
          return response.json();
        })
        .then(users => {
          console.log("Users: " ,users.data.firstName);
          setFormState({
            firstName: users.data.firstName,
            lastName: users.data.lastName,
            email: users.data.email,
            feedback: users.data.feedback
          })
        })
        .catch(err =>{
          console.log(err);
        })
      }

      const updateHandler = () => {
        const updatedFormState = {
          ...formState,
          userId: id
        }
        fetch('http://localhost:5000/updateFeedback', {
          method: "POST",
          headers:{ "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormState)
        })
        .then((response) =>{
          return response.json();
        })
        .then((data)=> {
          console.log(data)
          getAllFeedback();
          setFormState({
            firstName: '',
            lastName: '',
            email: '',
            feedback: ''
          })
          setId("");
        })
        .catch((error) => console.error(error));
      }

  return (
    <>
 <Box
        sx={{
          boxShadow: 3,
          width: "30rem",
          height: "fit-content",
          bgcolor: "#F8F9F9",
          px: 2,
          py: 1,
          mx: 70,
          my: 5,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">Feedback Form</Typography>
        <Divider
          sx={{
            mt: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2.5,
            my: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              onChange={changeHandler}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formState.firstName}
              fullWidth
            />

            <TextField
              onChange={changeHandler}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name="lastName"
              fullWidth
              value={formState.lastName}
            />

          </Box>

          <TextField
            name="email"
            onChange={changeHandler}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            value={formState.email}
          />

          <TextField
            onChange={changeHandler}
            id="outlined-multiline-static"
            label="Please enter your feedback here"
            multiline
            rows={4}
            fullWidth
            name="feedback"
            value={formState.feedback}
          />

          <Button 
            onClick={submitHandler} 
            variant="contained"
            size="large"
          >
              {id ? 'Update' : 'Submit Feedback'}
          </Button>
        </Box>
      </Box>

      {/* <TableContainer className="table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Firstname</TableCell>
              <TableCell align="center">Lastname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Feedback</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.feedback}</TableCell>

                <Button variant="outlined" color="success" onClick={() => updateIdHandler(row._id)}>
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteHandler(row._id)}
                >
                  Delete
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <CustomTable data={users} updateIdHandler={updateIdHandler} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
    </>
  );
};

export default Feedback;
