import React, { useState, useEffect } from "react"
import { Box, Typography, Button, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox } from "@mui/material"
import { starter } from "canisters/starter"
import LogoSquare from "/frontend/assets/logo_square.svg"

function TodoPageView() {
    const [inputStr, SetInputStr] = React.useState("");
    const [todoListData, setTodoListData] = React.useState([]);
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    const allTodoListData = async () => {
        if (inputStr !== "") {
            const testArrayVar = await starter.loadTodoList(inputStr)
            setTodoListData(testArrayVar)
            console.log(testArrayVar);
        }
    };

    useEffect(() => {
        allTodoListData();
    }, []);

    return (
    <Box
      margin="0 0 0 0"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <img
        src={LogoSquare}
        style={{ height: "20vmin", display: "block", margin: "2rem 0" }}
        alt="logo"
      />
      <Typography variant="h4">List of things to do</Typography>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todoListData.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
            <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>

    <TextField
        label="Add ToDo"
        variant="outlined"
        value={inputStr}
        placeholder="Enter a new todo"
        onChange={(e) => SetInputStr(e.target.value)}
        sx={{ margin: "2rem 0" }}
    />

    <Button
        variant="contained"
        color="primary"
        onClick={allTodoListData}
        sx={{ margin: "-1rem 0 3rem 0" }}
        >
        Add
    </Button>

    </Box>
  )
}

export default TodoPageView
