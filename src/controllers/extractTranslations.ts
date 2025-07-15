import { RequestHandler } from "express";
import { fetchHtml } from "../utils/fetchHtml/fetchHtml.js";
import { windowAdapter } from "../adapters/window.js";
import { services } from "../services/index.js";
import { WORD_REFERENCE_BASE_URL } from "../constants.js";
import { validators } from "../validators/index.js";

export interface ExtractTranslationsQueryType {
  word: string;
  sourceLang: string;
  targetLang: string;
}

export const extractTranslations: RequestHandler<unknown, unknown, unknown, ExtractTranslationsQueryType> = async (req, res, next) => {
  try {
    const { word, sourceLang, targetLang } = req.query;

    if (!word) {
      throw new Error("'word' parameter is required");
    }

    if (!sourceLang) {
      throw new Error("'sourceLang' parameter is required");
    }

    if (!targetLang) {
      throw new Error("'targetLang' parameter is required");
    }

    const html = await fetchHtml(`${WORD_REFERENCE_BASE_URL}/${sourceLang}${targetLang}/${word}`);
    const dom = new windowAdapter.DOMParser().parseFromString(html, "text/html");
    validators.validateDom(dom, req.query);
    const translationsEntries = services.extractor.extractTranslationEntries(dom, req.query);

    return res.status(200).json({ translationsEntries });
  }
  catch (error) {
    next(error);
  }
};