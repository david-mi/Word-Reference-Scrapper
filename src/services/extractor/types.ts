export type TranslationItemType = {
  entry: string,
  grammarTags: string;
};

export type ExtractedTranslationEntryType = {
  form: "regular" | "compound";
  entry: string,
  grammarTags: string;
  notes: string[];
  translationItems: TranslationItemType[],
  sourceSentenceExample: string,
  translatedSentenceExample: string,
};