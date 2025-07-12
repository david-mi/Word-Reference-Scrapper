import type { ExtractTranslationsQueryType } from "../controllers/extractTranslations.js";
import { CustomError } from "../middlewares/errorsHandler.js";

function validateTranslationPresence(dom: Document, word: ExtractTranslationsQueryType["word"]): void {
  const noTranslationFoundElement = dom.getElementById("noEntryFound");

  if (noTranslationFoundElement) {
    throw new CustomError(
      `There is no existing translation for : ${word}`,
      404
    );
  }
}

export const validateDom = (dom: Document, { word }: ExtractTranslationsQueryType): void => {
  validateTranslationPresence(dom, word);
};
