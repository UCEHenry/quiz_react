import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { handleAmountChange, handleScoreChange } from "../../actions";
import React from 'react';
import axios from 'axios'

export const FinalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector((state) => state.players);

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate("/settings");
    console.log(players)
  };

  const sendFinalScores = async () => {
    try{
      for (player of players) {
        await axios.patch('https://fpquizwar.herokuapp.com/users', {username:player.name, score: player.points})
      }
      const resp = await axios.get('https://fpquizwar.herokuapp.com/users')
      return resp.data
    } catch (err) {

    }
  }
  const retrieveTopTen = async () => {
    try{
      
      // const resp = await axios.get('https://fpquizwar.herokuapp.com/users')
      

    } catch (err) {

    }
  }

  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Final Score
      </Typography>
      <Button onClick={handleBackToSettings} variant="outlined">
        Back to Settings!
      </Button>
    </Box>
  );
};

    //export default FinalPage;







