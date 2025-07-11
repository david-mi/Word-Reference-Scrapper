import express from "express";
import { extractTranslations as extractTranslationsController } from "../controllers/index.js";

export const extractTranslationsRouter = express.Router();

extractTranslationsRouter.get("/extractTranslations", extractTranslationsController);