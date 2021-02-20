const express = require('express');
const server = express();
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(projectsRouter)
server.use(actionsRouter)

module.exports = server;
