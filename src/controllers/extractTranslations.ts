import { RequestHandler } from "express";
import { fetchHtml } from "../utils/fetchHtml/fetchHtml.js";
import { windowAdapter } from "../adapters/window.js";
import { services } from "../services/index.js";
import { WORD_REFERENCE_BASE_URL } from "../constants.js";

export interface ExtractTranslationsQueryType {
  word: string;
  fromLang: string;
  toLang: string;
}

export const extractTranslations: RequestHandler<unknown, unknown, unknown, ExtractTranslationsQueryType> = async (req, res, next) => {
  try {
    const { word, fromLang, toLang } = req.query;

    if (!word) {
      throw new Error("'word' parameter is required");
    }

    if (!fromLang) {
      throw new Error("'fromLang' parameter is required");
    }

    if (!toLang) {
      throw new Error("'toLang' parameter is required");
    }

    const html = await fetchHtml(`${WORD_REFERENCE_BASE_URL}/${fromLang}${toLang}/${word}`);
    const dom = new windowAdapter.DOMParser().parseFromString(html, "text/html");
    const translationsEntries = services.extractor.extractTranslationEntries(dom);

    return res.status(200).json({ translationsEntries });
  }
  catch (error) {
    next(error);
  }
};