import express from "express";
import { listRepos, listFiles, getFile, aiEditFile } from "../controllers/projectController.js";

const router = express.Router();

router.get("/projects", listRepos);
router.get("/projects/:owner/:repo/files", listFiles);
router.get("/projects/:owner/:repo/file", getFile);

// 🔥 ESSA LINHA QUE FALTAVA
router.post("/projects/:owner/:repo/ai-edit", aiEditFile);

export default router;