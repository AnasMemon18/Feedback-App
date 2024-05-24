import React from "react";
import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CustomTable from "../CustomTable/CustomTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

import toast, { Toaster } from 'react-hot-toast';

const Feedback = () => {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    feedback: "",
  });

  const successToast = () => toast.success("Feedback submitted successfully!!!", {
    position:"top-right",
    duration: 4000
  }); 

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if(name === 'firstName') {
      setFirstNameError(!/^[a-zA-Z]+$/.test(value));
    }
    if(name === 'lastName') {
      setLastNameError(!/^[a-zA-Z]+$/.test(value));
    }
    if(name === 'email') {
      setEmailError(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value));
    }

      setFormState((prevData) => ({
        ...prevData,
        [name]: value,
      }));

  };

  useEffect(() => {
    getAllFeedback();
  }, []);

  const getAllFeedback = () => {
    fetch("https://feedback-app-backend-ucva.onrender.com/getAllFeedback")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        setUsers(users.feedback);
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerHandler = () => {
    console.log("FormState: ", formState);
    fetch("https://feedback-app-backend-ucva.onrender.com/createFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        successToast();
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          feedback: "",
        });
        getAllFeedback();
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (id) {
      console.log("update part");
      updateHandler();
    } else {
      console.log("register part");
      registerHandler();
    }
  };

  const deleteHandler = (_id) => {
    console.log("Fetched ID: ", _id);
    const id = { id: _id };
    fetch("https://feedback-app-backend-ucva.onrender.com/deleteFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == 200) {
          getAllFeedback();
          setId("");
          setFormState({
            firstName: "",
            lastName: "",
            email: "",
            feedback: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateIdHandler = (_id) => {
    setId(_id);
    fetch(`https://feedback-app-backend-ucva.onrender.com/getDataById/${_id}`)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        console.log("Users: ", users.data.firstName);
        setFormState({
          firstName: users.data.firstName,
          lastName: users.data.lastName,
          email: users.data.email,
          feedback: users.data.feedback,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateHandler = () => {
    const updatedFormState = {
      ...formState,
      userId: id,
    };
    fetch("https://feedback-app-backend-ucva.onrender.com/updateFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFormState),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        getAllFeedback();
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          feedback: "",
        });
        setId("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
    <Toaster />
      <form onSubmit={submitHandler}>
        <Box
          sx={{
            boxShadow: 3,
            width: "30rem",
            height: "fit-content",
            bgcolor: "#F8F9F9",
            px: 2,
            py: 1,
            mx: "auto",
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
                required
                error={firstNameError}
                helperText={firstNameError ? 'Please enter a valid first name' : ''}
              />

              <TextField
                onChange={changeHandler}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                name="lastName"
                fullWidth
                required
                value={formState.lastName}
                error={lastNameError}
                helperText={lastNameError ? 'Please enter a valid last name' : ''}
              />
            </Box>

            <TextField
              name="email"
              onChange={changeHandler}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={formState.email}
              error={emailError}
              helperText={emailError ? 'Please enter a valid email' : ''}
            />

            <TextField
              onChange={changeHandler}
              id="outlined-multiline-static"
              label="Please enter your feedback here"
              multiline
              rows={4}
              fullWidth
              name="feedback"
              required
              value={formState.feedback}
            />

            <Button type="submit" variant="contained" size="large" disabled= {firstNameError || lastNameError || emailError}>
              {id ? "Update" : "Submit Feedback"}
            </Button>
          </Box>
        </Box>
      </form>

      <CustomTable
        data={users}
        updateIdHandler={updateIdHandler}
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default Feedback;
