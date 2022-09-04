import React, { useState } from "react"
import { Box, Typography, Button, TextField } from "@mui/material"
import { starter } from "canisters/starter"
import LogoSquare from "/frontend/assets/logo_square.svg"

const GreetingPageView = () => {
  const [inputStr, SetInputStr] = useState<string>("")
  const [hello, setHello] = useState<string>("")

  const doGreet = async () => {
    if (inputStr !== "") {
      setHello("Greeting in progress...")
      let greeting: string = await starter.greet(inputStr)
      setHello(greeting)
    }
  }

  return (
    <Box
      margin="6rem 0 0 0"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <img
        src={LogoSquare}
        style={{ height: "20vmin", display: "block", margin: "2rem 0" }}
        alt="logo"
      />
      <Typography variant="h4">Greetings from Internet Computer</Typography>
      <TextField
        label="Greeting"
        variant="outlined"
        value={inputStr}
        placeholder="Enter a greeting"
        onChange={(e) => SetInputStr(e.target.value)}
        sx={{ margin: "2rem 0" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={doGreet}
        sx={{ margin: "2rem 0" }}
      >
        send greeting
      </Button>
      <Typography variant="body1" color="secondary">
        {hello}
      </Typography>
    </Box>
  )
}

export default GreetingPageView
