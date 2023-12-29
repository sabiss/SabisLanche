import express from "express";
import cors from "cors";
import routes from "./src/routes";
import "express-async-errors";

const app = express();

app.use(cors({ origin: "*" }), express.json(), routes);

app.listen(3000, () => {
  console.log("A API está rodando na porta 3000");
});
