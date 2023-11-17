import express from "express";
import cors from "cors";
import usuario from "./API/routes/usuarioRoutes.js";
import login from "./API/routes/login.js";

const app = express();

app.use(cors("*"), express.json(), login, usuario);
app.listen(3000, () => {
  console.log("A API está rodando na porta 3000");
});
