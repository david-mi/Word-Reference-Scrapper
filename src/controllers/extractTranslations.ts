import { RequestHandler } from "express";
import { fetchHtml } from "../utils/fetchHtml/fetchHtml.js";
import { windowAdapter } from "../adapters/window.js";

export const extractTranslations: RequestHandler = async (req, res, next) => {
  try {
    const html = await fetchHtml("https://www.wordreference.com/enfr/folk");
    const dom = new windowAdapter.DOMParser().parseFromString(html, "text/html");

    return res.status(200).json({ messsage: "test" });
  }
  catch (error) {
    next(error);
  }
};