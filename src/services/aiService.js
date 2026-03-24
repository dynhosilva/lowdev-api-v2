import axios from "axios";

export const generateCode = async (prompt, code) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Você é um programador especialista. Retorne apenas código limpo."
        },
        {
          role: "user",
          content: `Código atual:\n${code}\n\nModifique com base nisso:\n${prompt}`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};