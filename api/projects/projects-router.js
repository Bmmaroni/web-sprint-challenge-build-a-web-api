// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")
const { validateProject, validateProjectId } = require("../middleware/middleware")

const router = express.Router()

router.get("/api/projects", (req, res) => {
  projects.get()
        .then(projects => {
          res.json(projects)
        })
        .catch( err => {next(err)})
})

router.get("/api/projects/:id", validateProjectId(), (req, res) => {
  res.json(res.project)
})

router.post("/api/projects", validateProject(), (req, res) => {
  projects.insert(req.body) // is a req.params.id needed here?
        .then(project => {
          res.status(201).json(project)
        })
        .catch( err => {next(err)})
})

router.put("/api/projects/:id", validateProject(), validateProjectId(), (req, res) => {
  projects.update(req.params.id, req.body)
        .then(project => {
          res.status(200).json(project)
        })
        .catch( err => {next(err)})
})

router.delete("/api/projects/:id", (req, res) => {
  projects.delete(req.params.id)
        .then(project => {res.status(204).end()})
        .catch( err => {next(err)})
})

router.get("/api/projects/:id/actions", validateProjectId(), (req, res) => {
  projects.getProjectActions(req.params.id)
        .then(actions => {
          res.status(200).json(actions)
        })
        .catch(err => {next(err)})
})

module.exports = router