import { fetchTranslation } from './translateFetcher';

global.fetch = jest.fn();

describe('fetchTranslation', () => {
    const TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';
    const mockText = ['Hello', 'World'];
    const mockTargetLang = 'es';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if TRANSLATE_API_KEY is missing', async () => {
        const originalApiKey = process.env.TRANSLATE_API_KEY;
        delete process.env.TRANSLATE_API_KEY;

        await expect(fetchTranslation(mockText, mockTargetLang)).rejects.toThrow(
            'Failed to fetch translation. Error: Unknown'
        );

        // Restore API key
        process.env.TRANSLATE_API_KEY = originalApiKey;
    });

    it('should return translated text array on success', async () => {
        const mockResponseData = {
            data: {
                translations: [
                    { translatedText: 'Hola', detectedSourceLanguage: 'en' },
                    { translatedText: 'Mundo', detectedSourceLanguage: 'en' },
                ]
            }
        };

        // Setup mock fetch to resolve with a successful response
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockResponseData,
        });

        const result = await fetchTranslation(mockText, mockTargetLang);

        expect(fetch).toHaveBeenCalledWith(
            `${TRANSLATE_API}?key=${process.env.TRANSLATE_API_KEY}`,
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ q: mockText, target: mockTargetLang }),
            })
        );
        expect(result).toEqual(['Hola', 'Mundo']);
    });

    it('should throw an error if the API response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            statusText: 'Bad Request',
        });

        await expect(fetchTranslation(mockText, mockTargetLang)).rejects.toThrow(
            'Failed to fetch translation. Error: Bad Request'
        );
    });

    it('should correctly decode HTML entities in the translated text', async () => {
        const mockResponseData = {
            data: {
                translations: [
                    { translatedText: 'It&#39;s a test', detectedSourceLanguage: 'en' },
                    { translatedText: 'He said &quot;hello&quot;', detectedSourceLanguage: 'en' },
                ]
            }
        };

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockResponseData,
        });

        const result = await fetchTranslation(mockText, mockTargetLang);

        expect(result).toEqual(["It's a test", 'He said "hello"']);
    });

    it('should throw an error if the API request fails', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: 'Bad Request',
        });

        await expect(fetchTranslation(['Hello'], 'fr')).rejects.toThrow(
            'Failed to fetch translation. Error: Bad Request'
        );
    });
});
