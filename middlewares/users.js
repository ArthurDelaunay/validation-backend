const users = require("../users.json")

const isSlugExist = (req, res, next) => {
  const user = users.find((user) => user.slug === req.params.slug)
  if (user) {
    next()
  } else {
    res.status(404).json("user not found")
  }
}

module.exports = { isSlugExist }
