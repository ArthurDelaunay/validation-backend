const express = require("express")
const slugify = require("slugify")
const { body, validationResult } = require("express-validator")
const { isSlugExist } = require("../middlewares/users")

const users = require("../users.json")
const checkCities = ["Tokyo", "Paris", "Los Angeles"]
const app = express()

// request to get all users
app.get("/", (req, res) => {
  res.json(users)
})

// request to get one user by dynamic url
app.get("/:slug", isSlugExist, (req, res) => {
  const user = users.find((user) => user.slug === req.params.slug)
  res.json(user)
})

// request to post a new user
app.post(
  "/",
  body("name").isLength({ min: 4 }).withMessage("name invalid"),
  body("password").isLength({ min: 8 }).withMessage("password invalid"),
  body("city").isIn(checkCities).withMessage("city invalid"),
  body("email").isEmail().withMessage("email invalid"),
  (req, res) => {
    const { errors } = validationResult(req)
    if (errors.length === 0) {
      const slugifyName = slugify(req.body.name, {
        remove: /[*+~.()'"!:@$]/g,
        lower: true,
      })

      newUser = {
        slug: slugifyName,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        city: req.body.city,
        profile_picture: req.body.image,
      }
      users.push(newUser)
      res.json(newUser)
    } else {
      res.status(400).json(errors)
    }
  }
)

module.exports = app
