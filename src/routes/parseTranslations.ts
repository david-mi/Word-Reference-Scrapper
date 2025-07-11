import express from "express";
import { parseTranslations as parseTranslationsController } from "../controllers";

export const parseTranslationsRouter = express.Router();

parseTranslationsRouter.get("/parseTranslations", parseTranslationsController);