import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static("public")); // to use images and styles in file named public and express look there for them
