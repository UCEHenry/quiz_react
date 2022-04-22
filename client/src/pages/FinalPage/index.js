import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { handleAmountChange, handleScoreChange } from "../../actions";
import { Leaderboard } from "../../components/Leaderboard/index"
import React from 'react';
import axios from 'axios'
import "./index.css"

export const FinalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector((state) => state.players);
  const [topTen, setTopTen] = useState([])
  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate("/settings");


  };

  const sendFinalScores = async () => {
    try {
      for (player of players) {
        await axios.patch('https://fpquizwar.herokuapp.com/users', { username: player.name, score: player.points })
      }
      const resp = await axios.get('https://fpquizwar.herokuapp.com/users')
      return resp.data
    } catch (err) {

    }
  }

  const retrieveTopTen = async () => {
    try {
      const resp = await axios.get('https://fpquizwar.herokuapp.com/users/topten')
      setTopTen(resp.data)
    } catch (err) {

    }
  }

  useEffect(() => {
    sendFinalScores()
    retrieveTopTen()
  }, [])

  
  return (
    <div className="leaderboard-bg">
        <h3 id="finalscore">Final Score</h3>
        {players[0].points}
        
        <Leaderboard topTen={topTen} />
        <Button onClick={handleBackToSettings} className="button-bg" variant="outlined">
          Back to Settings! 
        </Button>
    </div>
  );
};

    //export default FinalPage;







