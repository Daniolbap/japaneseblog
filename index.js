import express from "express";

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use(express.static("public"));

console.log(new Date().getFullYear());
