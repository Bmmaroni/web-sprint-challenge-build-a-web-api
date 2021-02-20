const actions = require("../actions/actions-model")
const projects = require("../projects/projects-model") 

function logger(req, res, next) {
  const time = new Date().toISOString()

  console.log(`[${time}] ${req.method} ${req.url}`)
  next()
}

function validateActionId() {
  return (req, res, next) => {
    actions.get(req.params.id)
          .then(action => {
            if (action) {
              req.action = action
              next()
            } else {
              res.status(404).json({
                message: "Action not found"
              })
            }
          })
          .catch(err => {
            res.status(500).json({
              message: "Error finding that action"
            })
          })
  }
}

function validateAction() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing action data"
      })
    } else if (!req.body.projectId || !req.body.description || !req.body.notes) {
      res.status(400).json({
        message: "missing required field"
      })
    }
  }
}

function validateProjectId() {
  return (req, res, next) => {
    projects.get(req.params.id)
          .then(project => {
            if (project) {
              req.project = project
              next()
            } else {
              res.status(404).json({
                message: "Project not found"
              })
            }
          })
          .catch(err => {
            res.status(500).json({
              message: "Error finding that project"
            })
          })
    next()
  }
}

function validateProject() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing project data"
      })
    } else if (!req.body.name || !req.body.description) {
      res.status(400).json({
        message: "missing required field"
      })
    }
  next()
  }
}

module.exports = {
  logger,
  validateActionId,
  validateAction,
  validateProjectId,
  validateProject
}