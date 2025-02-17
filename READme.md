# Task Manager

## Description
This is a collaborative task management system that allows users to create, update, assign, and delete tasks. It also includes a real-time chat feature where users can discuss tasks.

## Features
- Create, edit, and delete tasks.
- Assign tasks to users.
- View tasks in a dynamic list.
- Chat in real-time about tasks.

## Tech Stack
- **Frontend**: React, Axios, WebSocket
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB

## Installation

### Backend
1. Clone the backend repository.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file in the root of the backend folder and add your MongoDB connection URI as well as a secret key for JWT.
4. Run `npm start` to start the server on `http://localhost:5000`.

### Frontend
1. Clone the frontend repository.
2. Run `npm install` to install the required dependencies.
3. Run `npm start` to start the React development server on `http://localhost:3000`.

## Running Tests
To run tests for the frontend, use the following command:

```bash
npm test

