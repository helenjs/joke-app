
interface TranslateResponse {
    translatedText: string;
    detectedSourceLanguage: string;
}

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
    if (!response.ok) {
        console.log('resp', response);
        throw new Error(`Failed to fetch translation. Error: ${response.statusText}`);
    }

    const {data} = await response.json();
    return data.translations.map((translation:TranslateResponse) => {
        let formattedText = translation.translatedText.replace(/&#39;/g, "'");
        formattedText = formattedText.replace(/&quot;/g, '"');
        return formattedText;
    });
}
