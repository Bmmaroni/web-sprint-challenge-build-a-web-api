// Write your "actions" router here!
const express = require("express")
const { whereNotExists } = require("../../data/dbConfig")
const actions = require("./actions-model")

const router = express.Router()

router.get("/api/actions", (req, res) => {
  actions.get()
        .then(actions => {
          res.json(actions)
        })
        .catch( err => {next(err)})
})

router.get("/api/actions/:id", (req, res) => {
  actions.get(req.params.id)
        .then(action => {
          res.json(action)
        })
        .catch( err => {next(err)})

})

router.post("/api/actions", (req, res) => {

})

router.put("/api/actions/:id", (req, res) => {

})

router.delete("/api/actions/:id", (req, res) => {

})


module.exports = router