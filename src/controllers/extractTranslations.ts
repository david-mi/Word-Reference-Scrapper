import { RequestHandler } from "express";
import { fetchHtml } from "../utils/fetchHtml/fetchHtml.js";
import { windowAdapter } from "../adapters/window.js";
import { services } from "../services/index.js";

export const extractTranslations: RequestHandler = async (req, res, next) => {
  try {
    const html = await fetchHtml("https://www.wordreference.com/enfr/folk");
    const dom = new windowAdapter.DOMParser().parseFromString(html, "text/html");
    const translationsEntries = services.extractor.extractTranslationEntries(dom);

    return res.status(200).json({ translationsEntries });
  }
  catch (error) {
    next(error);
  }
};