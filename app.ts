import express from "express";
import cors from "cors";
import routes from "./src/routes/index";
import { errorHandler } from "./src/middleware/error.handle";

const app = express();

app.use(cors({ origin: "*" }), express.json(), routes, errorHandler);

app.listen(3000, () => {
  console.log("A API está rodando na porta 3000");
});
