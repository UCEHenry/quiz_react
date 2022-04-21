import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { usernameInput } from "../../actions";

export const UsernameComp = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(usernameInput(e.target.value));
  };

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Username Input"
          type="text"
          size="small"
        />
      </FormControl>
    </Box>
  );
};
