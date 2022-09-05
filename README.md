# Origyn Interview

Thanks for considering me as a potential employee, here is my hiring project as well as instructions to run it and a brief description of what it does.
  

## Requirements

- Install the Internet Computer SDK

### macOS / Linux

```
DFX_VERSION=0.10.0 sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)
```

### Windows 
There is no native support for `dfx` on Windows. However, by installing the Windows Subsystem for Linux (WSL), you can run dfx also on a Windows system.

Once you have WSL installed, you can install dfx within your WSL Linux terminal:

```
DFX_VERSION=0.10.0 sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)
```

**Note: Make sure your dfx version is version 0.10.0 or change your dfx.json file to match your version, otherwise you may run into issues.**

- NodeJS >=16.0.0

**Note: Make sure your node version is any version of 16 otherwise you may run into issues.**


## Get Started

With Git and credentials:
```
git clone https://github.com/RaulV10/Origyn-Interview.git
```

With Git and SSH:
```
git clone git@github.com:RaulV10/Origyn-Interview.git
```
  

## Running the project locally

For this project to start, type the following commands in the terminal:

```bash

# Starts the replica, running in the background

dfx start --background

# Clean start in case of any errors:

dfx start --clean  

# Deploys your canisters to the replica and generates your candid interface

dfx deploy

```

To start the development server type:
```bash
npm install
npm run dev
```

You can access the server at: `http://localhost:3000/#/todo-list`
  

## What does this project do?:

  - Returns a pre builded list of *things to do* from Motoko
  - Shows that list on a React component
  - You can add a new *thing to do* to the list
  - You can filter the list based on *Everything*, *Completed* and *Unfinished*

**Note: You are not allowed to mark as *complete* any element within the list, just to add a new one**

The project was made using Typescript  

### Thanks 😄