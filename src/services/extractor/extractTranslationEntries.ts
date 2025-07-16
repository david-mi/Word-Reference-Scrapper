import { ExtractTranslationsQueryType } from "../../controllers/extractTranslations.js";
import type { TranslationItemType, ExtractedTranslationEntryType } from "./types.js";

function getRowGroupSiblings(baseElem: Element): Element[] {
  const siblings: Element[] = [baseElem];
  let nextSibling = baseElem.nextElementSibling;

  while (nextSibling?.id === "") {
    siblings.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling;
  }

  return siblings;
}

export function extractTranslationRowGroups(html: Document, { sourceLang, translationLang }: ExtractTranslationsQueryType): Element[][] {
  return Array
    .from(html.querySelectorAll(`tr[id^='${sourceLang}${translationLang}']`))
    .map(getRowGroupSiblings);
}

export function extractTranslationEntries(html: Document, query: ExtractTranslationsQueryType): ExtractedTranslationEntryType[] {
  const translationRowGroups = extractTranslationRowGroups(html, query);
  const extractedTranslationEntries: ExtractedTranslationEntryType[] = [];

  for (const translationRowGroup of translationRowGroups) {
    const extractedTranslationEntry: ExtractedTranslationEntryType = {
      form: "regular",
      entry: "",
      grammarTags: "",
      notes: [],
      translationItems: [],
      sourceSentenceExample: "",
      translatedSentenceExample: "",
    };

    for (const translationRow of translationRowGroup) {
      setForm(extractedTranslationEntry, translationRow);
      setWord(extractedTranslationEntry, translationRow);
      setGrammarTags(extractedTranslationEntry, translationRow);
      setNotes(extractedTranslationEntry, translationRow);
      setTranslationItem(extractedTranslationEntry, translationRow);
      setSourceSentenceExample(extractedTranslationEntry, translationRow);
      setTranslatedSentenceExample(extractedTranslationEntry, translationRow);
    }

    extractedTranslationEntries.push(extractedTranslationEntry);
  }

  return extractedTranslationEntries;
}

function setForm(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const parentTbodyElement = translationRow.closest("tbody") as HTMLTableSectionElement;
  const isRegularForm = parentTbodyElement.querySelector("#regular") !== null;

  extractedTranslationEntry.form = isRegularForm
    ? "regular"
    : "compound";
}

function setWord(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const extractedWord = translationRow.querySelector(".FrWrd > strong")?.textContent?.trim() || "";

  extractedTranslationEntry.entry ||= extractedWord;
}

function setGrammarTags(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const grammarTags = translationRow.querySelector(".FrWrd > em")?.firstChild?.textContent?.trim() || "";

  extractedTranslationEntry.grammarTags ||= grammarTags;
}

function setNotes(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const notes = translationRow.querySelector(".FrWrd")?.nextElementSibling?.textContent?.trim() || "";
  if (notes === "") return;

  extractedTranslationEntry.notes.push(...notes.split(/(?<=\))\s+/));
}

function setTranslationItem(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const wordContainerElement = translationRow.querySelector(".ToWrd");
  if (!wordContainerElement) return;

  const translationItem: TranslationItemType = {
    entry: wordContainerElement?.firstChild?.textContent?.trim() || "",
    grammarTags: wordContainerElement.querySelector("em")?.firstChild?.textContent?.trim() || "",
  };

  extractedTranslationEntry.translationItems.push(translationItem);
}

function setSourceSentenceExample(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const sourceSentence = translationRow.querySelector(".FrEx")?.textContent?.trim() || "";

  extractedTranslationEntry.sourceSentenceExample ||= sourceSentence;
};

function setTranslatedSentenceExample(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const translatedSentence = translationRow.querySelector(".ToEx")?.textContent?.trim() || "";

  extractedTranslationEntry.translatedSentenceExample ||= translatedSentence;
};