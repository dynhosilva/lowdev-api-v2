import axios from "axios";

// 🔥 instância base do GitHub (melhor prática)
const github = axios.create({
  baseURL: "https://api.github.com",
});

// 🔥 Buscar repositórios
export const getRepos = async (token) => {
  const response = await github.get("/user/repos", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return response.data;
};

// 🔥 Listar arquivos/pastas do repo
export const getRepoFiles = async (token, owner, repo) => {
  const response = await github.get(
    `/repos/${owner}/${repo}/contents`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  return response.data;
};

// 🔥 Ler conteúdo de um arquivo específico
export const getFileContent = async (token, owner, repo, path) => {
  const response = await github.get(
    `/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  const contentBase64 = response.data.content;

  const content = Buffer.from(contentBase64, "base64").toString("utf-8");

  return content;
};

// 🔥 Atualizar arquivo (commit)
export const updateFile = async (token, owner, repo, path, content, sha) => {
  const response = await github.put(
    `/repos/${owner}/${repo}/contents/${path}`,
    {
      message: "update via LowDev 🚀",
      content: Buffer.from(content).toString("base64"),
      sha
    },
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  return response.data;
};