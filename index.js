import express from "express";

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/faqs", (req, res) => {
  res.render("faqs.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/everything", (req, res) => {
  res.render("everithing.ejs");
});
app.use(express.static("public"));

console.log();
