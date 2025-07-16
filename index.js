import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Soporte para __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const COMMENTS_FILE = path.join(__dirname, "comments.json");

// Leer comentarios del archivo
function loadComments() {
  try {
    const data = fs.readFileSync(COMMENTS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Guardar comentarios
function saveComments(comments) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// Rutas
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/everything", (req, res) => res.render("everithing"));

// 🟡 Mostrar la página de FAQs con los comentarios
app.get("/faqs", (req, res) => {
  const comments = loadComments();
  res.render("faqs", { comments });
});

// 🟢 Procesar nuevo comentario
app.post("/faqs", (req, res) => {
  const text = req.body.comment?.trim();
  if (!text) return res.redirect("/faqs");

  const comments = loadComments();
  comments.push({ id: Date.now(), text });
  saveComments(comments);

  res.redirect("/faqs");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
