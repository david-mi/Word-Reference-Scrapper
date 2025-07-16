import express from "express";
import { errorsHandler } from "../middlewares/index.js";
import { extractTranslationsRouter } from "../routes/index.js";

export const server = express();

server.use(express.json());

server.get("/extractTranslations", extractTranslationsRouter);

server.use(errorsHandler);
