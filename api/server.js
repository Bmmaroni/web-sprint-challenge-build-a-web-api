const express = require('express');
const { logger } = require("./middleware/middleware")
const server = express();
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(logger)
server.use(projectsRouter)
server.use(actionsRouter)

server.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({
    message: "Something went wrong on our end"
  })
})

server.get("/", (req,res) => {
  res.send(`<h2>Sprint Challenge --- Build A Web API</h2>`)
})

module.exports = server;
