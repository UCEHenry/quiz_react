import React from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Typography } from "@mui/material";
import { SelectField } from "../../components";
import { TextFieldComp } from "../../components";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import './index.css';

export const Settings = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const history = useNavigate();
  // console.log(response)
  if (loading) {
    return (
      <Box mt={20}>
        <h1>Host Settings</h1>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong
      </Typography>
    );
  }

  const localOrOnline = [
    { id: "local", name: "Local" },
    { id: "online", name: "Online" },
  ];

  const amountOfPlayers= [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" },
    { id: "4", name: "4" },
  ];

  const username = [
    { id: "username", type: "input" },
  ];

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    history("/quiz");
  };

  return (
    <div className="background-color">
    <form  onSubmit={handleSubmit}>
      <h1>Host Settings</h1>
      <div className="form-container">
      <SelectField options={username} label="Username" />
      <SelectField options={localOrOnline} label="Local or Online" />
      <SelectField options={amountOfPlayers} label="Amount of Players" />
      <SelectField options={response.trivia_categories} label="Category" />
      <SelectField options={difficultyOptions} label="Difficulty" />
      <SelectField options={typeOptions} label="Type" />
      <TextFieldComp />
      <Box mt={3} width="30%">
        <Button fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
      </div>
    </form>
    </div>
  );
};
