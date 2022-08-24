const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const usersRoutes = require("./routes/users")

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

app.get("/", (req, res) => {
  res.json("Users API")
})

app.use("/users", usersRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
