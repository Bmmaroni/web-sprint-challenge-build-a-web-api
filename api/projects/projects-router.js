// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")
const { validateProjectId, validateProject } = require("../middleware/middleware")

const router = express.Router()

router.get("/api/projects", (req, res, next) => {
  projects.get()
          .then(projects => {
            res.json(projects)
          })
          .catch( err => {next(err)})
})

router.get("/api/projects/:id", validateProjectId(), (req, res) => {
  res.json(req.project)
})

router.post("/api/projects", validateProject(), (req, res, next) => {
  projects.insert(req.body)
          .then(project => {
            res.status(201).json(project)
          })
          .catch( err => {next(err)})
})

router.put("/api/projects/:id", validateProject(), (req, res, next) => {
  projects.update(req.params.id, req.body)
          .then((project) => {
            if (project) {
              res.status(200).json(project)
            } else {
              res.status(404).json({
                message: "Project not found"
              })
            }
          })
          .catch( err => {next(err)})
})

router.delete("/api/projects/:id", validateProjectId(), (req, res, next) => {
  projects.remove(req.params.id)
          .then(project => {res.status(204).end()})
          .catch( err => {next(err)})
})

router.get("/api/projects/:id/actions", (req, res, next) => {
  projects.getProjectActions(req.params.id)
          .then(actions => {
            res.status(200).json(actions)
          })
          .catch(err => {next(err)})
})

module.exports = router