import axios from "axios";
import { getRepos, getFileContent, updateFile } from "../services/githubService.js";
import { generateCode } from "../services/aiService.js";

const DEFAULT_TOKEN = process.env.GITHUB_TOKEN;

// 🔥 LISTAR REPOSITÓRIOS
export const listRepos = async (req, res) => {
  try {
    const token = req.headers.token || DEFAULT_TOKEN;

    if (!token) {
      return res.status(400).json({ error: "Token não enviado" });
    }

    const repos = await getRepos(token);

    res.json(repos);
  } catch (error) {
    console.log("🔥 ERRO REPOS:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Erro ao buscar repositórios",
      details: error.response?.data || error.message
    });
  }
};

// 🔥 LISTAR ARQUIVOS (VERSÃO FINAL CORRETA)
export const listFiles = async (req, res) => {
  try {
    const token = req.headers.token || DEFAULT_TOKEN;
    const owner = "dynhosilva";
    const repo = req.params.repo;

    if (!token) {
      return res.status(400).json({ error: "Token não enviado" });
    }

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    // 🔥 FORMATO IDEAL PRO LOVABLE
    const files = response.data.map((item) => ({
      name: item.name,
      path: item.path,
      type: item.type, // ajuda diferenciar pasta/arquivo
    }));

    res.json(files);
  } catch (error) {
    console.log("🔥 ERRO FILES:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Erro ao buscar arquivos",
      details: error.response?.data || error.message
    });
  }
};

// 🔥 LER CONTEÚDO DO ARQUIVO
export const getFile = async (req, res) => {
  try {
    const token = req.headers.token || DEFAULT_TOKEN;
    const owner = "dynhosilva";
    const repo = req.params.repo;
    const { path } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Token não enviado" });
    }

    if (!path) {
      return res.status(400).json({ error: "Path não enviado" });
    }

    const content = await getFileContent(token, owner, repo, path);

    res.json({ content });
  } catch (error) {
    console.log("🔥 ERRO FILE:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Erro ao buscar arquivo",
      details: error.response?.data || error.message
    });
  }
};

// 🔥 IA EDITAR ARQUIVO + COMMIT
export const aiEditFile = async (req, res) => {
  try {
    const token = req.headers.token || DEFAULT_TOKEN;
    const owner = "dynhosilva";
    const repo = req.params.repo;
    const { path, prompt } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token não enviado" });
    }

    if (!path || !prompt) {
      return res.status(400).json({ error: "Path ou prompt não enviado" });
    }

    // 🔥 pegar conteúdo atual
    const fileResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: { Authorization: `token ${token}` }
      }
    );

    const currentContent = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");
    const sha = fileResponse.data.sha;

    // 🔥 IA gera novo código
    const newCode = await generateCode(prompt, currentContent);

    // 🔥 commit no GitHub
    const result = await updateFile(token, owner, repo, path, newCode, sha);

    res.json({
      message: "Arquivo atualizado com IA 🚀",
      commit: result.commit.html_url
    });

  } catch (error) {
    console.log("🔥 ERRO AI EDIT:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Erro ao editar arquivo",
      details: error.response?.data || error.message
    });
  }
};