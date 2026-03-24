import express from "express";
import { listRepos, listFiles, getFile, aiEditFile } from "../controllers/projectController.js";

const router = express.Router();

// 🔥 LISTAR REPOSITÓRIOS
router.get("/projects", listRepos);

// 🔥 LISTAR ARQUIVOS (SEM OWNER)
router.get("/projects/:repo/files", (req, res) => {
  req.params.owner = "dynhosilva"; // 👈 seu usuário GitHub
  listFiles(req, res);
});

// 🔥 PEGAR UM ARQUIVO
router.get("/projects/:repo/file", (req, res) => {
  req.params.owner = "dynhosilva";
  getFile(req, res);
});

// 🔥 IA EDITAR ARQUIVO
router.post("/projects/:repo/ai-edit", (req, res) => {
  req.params.owner = "dynhosilva";
  aiEditFile(req, res);
});

export default router;