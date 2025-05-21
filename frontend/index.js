const express = require("express")
const app = express()

BACKEND_URL = process.env.BACKEND_URL|| "http://localhost:5000"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index")
})
app.post("/signup", async (req, res) => {
  const formdata = req.body
  try {
    const resp = await fetch(BACKEND_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata)
    })
    // const data = await resp.json()
    res.send("Registered successfully")

  } catch (e) {
    console.log(e)
    res.status(500).send("Error sending data")
  }
})

app.listen(4000, () => {
  console.log("http://localhost:4000/")
})