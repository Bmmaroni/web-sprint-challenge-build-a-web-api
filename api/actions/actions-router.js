// Write your "actions" router here!
const express = require("express")
const actions = require("./actions-model")
const { validateActionId, validateAction } = require("../middleware/middleware")

const router = express.Router()

router.get("/api/actions", (req, res) => {
  actions.get()
        .then(actions => {
          res.json(actions)
        })
        .catch( err => {next(err)})
})

router.get("/api/actions/:id", validateActionId(), (req, res) => {
  res.json(res.action)
})

router.post("/api/actions", validateAction(), (req, res) => {
  actions.insert(req.body) // is a req.params.id needed here?
        .then(action => {
          res.status(201).json(action)
        })
        .catch( err => {next(err)})
})

router.put("/api/actions/:id", validateAction(), validateActionId(), (req, res) => {
  actions.update(req.params.id, req.body)
        .then(action => {
          res.status(200).json(action)
        })
        .catch( err => {next(err)})
})

router.delete("/api/actions/:id", validateActionId(), (req, res) => {
  actions.delete(req.params.id)
        .then(action => {res.status(204).end()})
        .catch( err => {next(err)})
})


module.exports = router