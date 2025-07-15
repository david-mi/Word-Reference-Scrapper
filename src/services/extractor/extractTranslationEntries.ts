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

export function extractTranslationRowGroups(html: Document): Element[][] {
  return Array
    .from(html.querySelectorAll("tr[id^='enfr']"))
    .map(getRowGroupSiblings);
}

export function extractTranslationEntries(html: Document): ExtractedTranslationEntryType[] {
  const translationRowGroups = extractTranslationRowGroups(html);
  const extractedTranslationEntries: ExtractedTranslationEntryType[] = [];

  for (const translationRowGroup of translationRowGroups) {
    const extractedTranslationEntry: ExtractedTranslationEntryType = {
      form: "regular",
      entry: "",
      grammarTags: "",
      notes: [],
      translationItems: [],
      sourceSentence: "",
      targetSentence: "",
    };

    for (const translationRow of translationRowGroup) {
      setForm(extractedTranslationEntry, translationRow);
      setWord(extractedTranslationEntry, translationRow);
      setGrammarTags(extractedTranslationEntry, translationRow);
      setNotes(extractedTranslationEntry, translationRow);
      setTranslationItem(extractedTranslationEntry, translationRow);
      setSourceSentence(extractedTranslationEntry, translationRow);
      setTargetSentence(extractedTranslationEntry, translationRow);
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

function setSourceSentence(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const sourceSentence = translationRow.querySelector(".FrEx")?.textContent?.trim() || "";

  extractedTranslationEntry.sourceSentence ||= sourceSentence;
};

function setTargetSentence(extractedTranslationEntry: ExtractedTranslationEntryType, translationRow: Element): void {
  const targetSentence = translationRow.querySelector(".ToEx")?.textContent?.trim() || "";

  extractedTranslationEntry.targetSentence ||= targetSentence;
};