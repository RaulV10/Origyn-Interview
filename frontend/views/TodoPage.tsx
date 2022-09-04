import React, { useState, useEffect } from "react"
import { Box, Typography, ToggleButton, ToggleButtonGroup, Button, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox } from "@mui/material"
import { starter } from "canisters/starter"
import LogoSquare from "/frontend/assets/logo_square.svg"

function TodoPageView() {

    interface TodoList {
      desc: string;
      state: boolean;
    }

    let list: TodoList[] = [];
    const EVERYTHING = 1;
    const COMPLETED = 2;
    const UNFINISHED = 3;

    const [inputStr, setInputStr] = React.useState<string>("");
    const [loading, setLoading] = React.useState<string>("");
    const [checked, setChecked] = React.useState([0]);
    const [todoListData, setTodoListData] = React.useState<TodoList[]>([]);
    const [alignment, setAlignment] = React.useState<number>(EVERYTHING);
    
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: number,
    ) => {
      setAlignment(newAlignment);
    };

    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      console.log(todoListData[value]);
      // No se me ocurre, pero se tiene que cambiar aqui el valor de state en el index donde le picaron
      // todoListData[value].state = newChecked[currentIndex];
      setTodoListData(todoListData);
  
      setChecked(newChecked);
    };

    const allTodoListData = async () => {
      setLoading("Loading list...");
      const todoDesc = await starter.loadTodoList(inputStr);
      const todoState = await starter.loadTodoListState();

      switch(alignment) {
        case EVERYTHING:
          for(let i:number =0; i < todoDesc.length; i++) {
            list.push({desc: todoDesc[i], state: todoState[i]});
          }
          break;
        case COMPLETED:
          for(let i:number =0; i < todoDesc.length; i++) {
            console.log("i: " + todoState[i]);
            if(todoState[i]) { list.push({desc: todoDesc[i], state: todoState[i]}); }
          }
          break;
        case UNFINISHED:
          for(let i:number =0; i < todoDesc.length; i++) {
            console.log("i: " + todoState[i]);
            if(!todoState[i]) { list.push({desc: todoDesc[i], state: todoState[i]}); }
          }
          break;
        default:
          break;
      }

      setLoading("");
      setTodoListData(list);
      setInputStr("");
    };

    useEffect(() => {
      console.log(alignment);
      allTodoListData();
  }, [alignment]);

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

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ margin: "1rem 0" }}
      >
        <ToggleButton value={EVERYTHING}>EVERYTHING</ToggleButton>
        <ToggleButton value={COMPLETED}>COMPLETED</ToggleButton>
        <ToggleButton value={UNFINISHED}>UNFINISHED</ToggleButton>
      </ToggleButtonGroup>

      <Typography
        sx={{ margin: "0" }}
        color="secondary"
        variant="body1"
        children={loading}
      />

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todoListData.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
            <ListItem
            key={value.desc}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={() => {
              console.log(todoListData);
              handleToggle(index);
            }} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(index) !== -1}
                  // checked={value.state}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  // onChange={(e) => {
                  //   todoListData[index].state = e.target.checked;
                  //   setTodoListData(todoListData);
                  // }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.desc}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>

    <TextField
        label="Add ToDo"
        id="textField"
        variant="outlined"
        value={inputStr}
        placeholder="Enter a new todo"
        onChange={(e) => setInputStr(e.target.value)}
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
