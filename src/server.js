import app from "./app.js";

const PORT = process.env.PORT || 3000;

console.log("🔥 iniciando servidor...");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 LowDev API rodando na porta ${PORT}`);
});