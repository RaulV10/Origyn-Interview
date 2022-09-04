import React, { useState, useEffect } from "react"

import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material"

import { starter } from "canisters/starter"
import LogoSquare from "../../frontend/assets/logo_square.svg"

const TodoPageView = () => {
  interface TodoList {
    desc: string
    state: boolean
  }

  let list: TodoList[] = []
  const EVERYTHING: number = 1
  const COMPLETED: number = 2
  const UNFINISHED: number = 3

  const [inputStr, setInputStr] = useState<string>("")
  const [loading, setLoading] = useState<string>("")
  const [todoListData, setTodoListData] = useState<TodoList[]>([])
  const [alignment, setAlignment] = useState<number>(EVERYTHING)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number,
  ) => {
    setAlignment(newAlignment)
  }

  const allTodoListData = async () => {
    setLoading("Loading list...")
    const todoDesc: [string] = await starter.loadTodoList(inputStr)
    const todoState: [boolean] = await starter.loadTodoListState()

    switch (alignment) {
      case EVERYTHING:
        for (let i: number = 0; i < todoDesc.length; i++) {
          list.push({ desc: todoDesc[i], state: todoState[i] })
        }
        break
      case COMPLETED:
        for (let i: number = 0; i < todoDesc.length; i++) {
          if (todoState[i]) {
            list.push({ desc: todoDesc[i], state: todoState[i] })
          }
        }
        break
      case UNFINISHED:
        for (let i: number = 0; i < todoDesc.length; i++) {
          if (!todoState[i]) {
            list.push({ desc: todoDesc[i], state: todoState[i] })
          }
        }
        break
      default:
        break
    }

    setLoading("")
    setTodoListData(list)
    setInputStr("")
  }

  useEffect(() => {
    allTodoListData()
  }, [alignment])

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

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todoListData.map((value: TodoList) => {
          const labelId = `checkbox-list-label-${value}`
          return (
            <ListItem key={value.desc}>
              <ListItemIcon>
                <Checkbox
                  readOnly
                  edge="start"
                  checked={value.state}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.desc}`} />
            </ListItem>
          )
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
