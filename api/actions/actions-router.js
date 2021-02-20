// Write your "actions" router here!
const express = require("express")
const actions = require("./actions-model")
const { validateActionId, validateAction } = require("../middleware/middleware")

const router = express.Router()

router.get("/api/actions", (req, res, next) => {
  actions.get()
        .then(actions => {
          res.json(actions)
        })
        .catch( err => {next(err)})
})

router.get("/api/actions/:id", validateActionId(), (req, res) => {
  res.json(req.action)
})

router.post("/api/actions", validateAction(), (req, res, next) => {
  actions.insert(req.body)
        .then(action => {
          res.status(201).json(action)
        })
        .catch( err => {next(err)})
})

router.put("/api/actions/:id", validateAction(), validateActionId(), (req, res, next) => {
  actions.update(req.params.id, req.body)
        .then(action => {
          res.status(200).json(action)
        })
        .catch( err => {next(err)})
})

router.delete("/api/actions/:id", validateActionId(), (req, res, next) => {
  actions.remove(req.params.id)
        .then(action => {res.status(204).end()})
        .catch( err => {next(err)})
})

module.exports = router