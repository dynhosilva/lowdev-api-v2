import express from "express";
import { listRepos, listFiles, getFile, aiEditFile } from "../controllers/projectController.js";

const router = express.Router();

// 🔥 LISTAR REPOSITÓRIOS
router.get("/projects", listRepos);

// 🔥 ROTAS COMPATÍVEIS COM LOVABLE (COM OWNER)
router.get("/projects/:owner/:repo/files", listFiles);
router.get("/projects/:owner/:repo/file", getFile);
router.post("/projects/:owner/:repo/ai-edit", aiEditFile);

// 🔥 ROTAS SIMPLES (SEM OWNER)
router.get("/projects/:repo/files", (req, res) => {
  req.params.owner = "dynhosilva";
  listFiles(req, res);
});

router.get("/projects/:repo/file", (req, res) => {
  req.params.owner = "dynhosilva";
  getFile(req, res);
});

router.post("/projects/:repo/ai-edit", (req, res) => {
  req.params.owner = "dynhosilva";
  aiEditFile(req, res);
});

export default router;