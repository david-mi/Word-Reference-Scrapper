# Word Reference Scrapper

## Description
Word Reference Scrapper is an Express API that extracts translations data from a given word, using WordReference

## Features
- Extract translations and associated data for a given word.
- Support for dynamic parameters for source and target languages.

## Installation

### Prerequisites
- Node.js (recommended LTS version)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/david-mi/Word-Reference-Scrapper
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file:
   ```env
   PORT=<chosen_port>
   ```

## Usage

### Start the server locally
```bash
npm run dev
```

### Make a request
Send a GET request to the API to the `extractTranslations` route with the following parameters:
- `word`: The word to translate.
- `sourceLang`: The source language in *ISO 639-1* format (e.g., **es** for Spanish).
- `translationLang`: The target language in *ISO 639-1* format (e.g., **en** for English).

### Example

```
https://word-reference-scrapper.vercel.app/extractTranslations?word=hola&sourceLang=es&translationLang=en
```

## [> Test link here <](https://word-reference-scrapper.vercel.app/extractTranslations?word=hola&sourceLang=es&translationLang=en)

Output: 

```json
{
  "translationsEntries": [
    {
      "form": "regular",
      "entry": "¡hola!",
      "grammarTags": "interj",
      "notes": [
        "informal (saludo)",
        "(formal)"
      ],
      "translationItems": [
        {
          "entry": "Hello!",
          "grammarTags": "interj"
        },
        {
          "entry": "Hi!",
          "grammarTags": "interj"
        },
        {
          "entry": "Hey! What's Up!",
          "grammarTags": "interj"
        }
      ],
      "sourceSentenceExample": "—¡Hola, Rafael! ¿Cómo estás? —¡Hola, Diego! Bien, ¿y tú?",
      "translatedSentenceExample": "- Hello, Rafael! How are you?\n- Hello, Diego. I'm well. And you?"
    },
    {
      "form": "regular",
      "entry": "¿hola?",
      "grammarTags": "interj",
      "notes": [
        "(al contestar el teléfono)"
      ],
      "translationItems": [
        {
          "entry": "Hello?",
          "grammarTags": "interj"
        }
      ],
      "sourceSentenceExample": "¿Hola? ¿Quién es?",
      "translatedSentenceExample": "Hello? Who is it?"
    },
    {
      "form": "compound",
      "entry": "¡hola!",
      "grammarTags": "interj",
      "notes": [
        "ES: coloquial (expresa extrañeza)"
      ],
      "translationItems": [
        {
          "entry": "hello",
          "grammarTags": "interj"
        }
      ],
      "sourceSentenceExample": "¡Hola, hola, hola! ¿Qué tenemos aquí?",
      "translatedSentenceExample": "Hello, hello, hello. What's all this, then?"
    },
    {
      "form": "compound",
      "entry": "hola a todos, hola a todas",
      "grammarTags": "expr",
      "notes": [
        "(saludo a un grupo)"
      ],
      "translationItems": [
        {
          "entry": "hi everyone",
          "grammarTags": "interj"
        },
        {
          "entry": "hello all",
          "grammarTags": "interj"
        }
      ],
      "sourceSentenceExample": "Hola a todos. ¿Cómo están?",
      "translatedSentenceExample": "Hi everyone! How are you?"
    },
    {
      "form": "compound",
      "entry": "hola y adiós",
      "grammarTags": "expr",
      "notes": [
        "literario (encuentro breve)"
      ],
      "translationItems": [
        {
          "entry": "hello and goodbye",
          "grammarTags": "expr"
        },
        {
          "entry": "hail and farewell",
          "grammarTags": "expr"
        }
      ],
      "sourceSentenceExample": "No somos amigos, apenas nos decimos \"hola y adiós\".",
      "translatedSentenceExample": "We aren't friends. We only say \"hello and goodbye\"."
    }
  ]
}
```