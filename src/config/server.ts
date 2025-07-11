import express from "express";
import { errorsHandler } from "../middlewares/index.js";
import { parseTranslationsRouter } from "../routes/index.js";

export const server = express();
server.use(express.json());

server.get("/parseTranslations", parseTranslationsRouter);

server.use(errorsHandler);