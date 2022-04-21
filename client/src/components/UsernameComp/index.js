import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usernameInput } from "../../actions";

export const UsernameComp = ({playerId}) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    console.log('handle change')
    if(e.key ==='Enter') {
      dispatch(usernameInput(playerId, e.target.value));
    }
    
  };

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          onKeyPress={handleChange}
          variant="outlined"
          label="Username Input"
          type="text"
          size="small"
        />
      </FormControl>
    </Box>
  );
};
