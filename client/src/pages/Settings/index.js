import React from "react"
import { Box } from "@mui/system"
import { Button, CircularProgress, Typography } from "@mui/material"
import { SelectField } from "../../components"
import { TextFieldComp } from "../../components"
import useAxios from "../../hooks/useAxios"
import { useNavigate } from "react-router-dom"


export const Settings = () => {
    const { response, error, loading } = useAxios({ url: "/api_category.php" });
    const history = useNavigate()

    if (loading) {
        return (
            <Box mt={20}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" mt={20} color="red">
                Something went wrong
            </Typography>
        )
    }

    const difficultyOptions = [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
    ]

    const typeOptions = [
        { id: "multiple", name: "Multiple Choice" },
        { id: "boolean", name: "True/False" },
    ]

    const handleSubmit = e => {
        e.preventDefault();
        history.push('/questions')
    };

    return (
        <form onSubmit={handleSubmit}>
            <SelectField options={response.trivia_categories} label="Category" />
            <SelectField options={difficultyOptions} label="Difficulty" />
            <SelectField options={typeOptions} label="Type" />
            <TextFieldComp />
            <Box mt={3} width="100%">
                <Button fullWidth variant="contained" type="submit">
                    Get Started
                </Button>
            </Box>
        </form>
    )
}


