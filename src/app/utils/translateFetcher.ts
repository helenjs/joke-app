
interface TranslateResponse {
    translatedText: string;
    detectedSourceLanguage: string;
}

/**
 * fetchTranslation - Function to fetch translations for given texts
 * @param {string[]} text - An array of text strings to be translated
 * @param {string} targetLang - The target language code for translation (e.g., 'es' for Spanish)
 * @returns {Promise<string[]>} - A promise that resolves with an array of translated strings
 * @throws {Error} - Throws an error if the translation fetch fails, with a message indicating the reason for failure
 */

const TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';
export const fetchTranslation = async (text: string[], targetLang: string) => {
    const response = await fetch(`${TRANSLATE_API}?key=${process.env.TRANSLATE_API_KEY}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            target: targetLang,
        }),
    });
    if (!response?.ok) {
        throw new Error(`Failed to fetch translation. Error: ${response?.statusText ?? 'Unknown'}`);
    }

    const {data} = await response.json();
    return data.translations.map((translation:TranslateResponse) => {
        let formattedText = translation.translatedText.replace(/&#39;/g, "'");
        formattedText = formattedText.replace(/&quot;/g, '"');
        return formattedText;
    });
}
