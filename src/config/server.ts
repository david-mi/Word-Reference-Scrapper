import express from "express";
import { errorsHandler } from "../middlewares";
import { parseTranslationsRouter } from "../routes";

export const server = express();
server.use(express.json());

server.get("/parseTranslations", parseTranslationsRouter);

server.use(errorsHandler);