const router = express.Router();
import * as path from "path";
import express from "express";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// / or /index or /index.html
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
