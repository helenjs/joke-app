import { getError } from '@utils/getError';
import { fetchTranslation } from '@utils/translateFetcher';
import { errorTitle } from '@/app/config';

jest.mock('@utils/translateFetcher', () => ({
    fetchTranslation: jest.fn()
}));

describe('getError', () => {
    const locale = 'en';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return translated error message when err contains a message', async () => {
        const err = { message: 'Network error occurred' };
        const expectedMessage = [errorTitle, err.message];

        (fetchTranslation as jest.Mock).mockResolvedValue('Translated error message');

        const result = await getError(err, locale);

        expect(fetchTranslation).toHaveBeenCalledWith(expectedMessage, locale);
        expect(result).toBe('Translated error message');
    });

    it('should return default error message when err.message is missing', async () => {
        const err = { code: '500' };
        const expectedMessage = [errorTitle, 'Unexpected error happened'];

        (fetchTranslation as jest.Mock).mockResolvedValue('Translated default error message');

        const result = await getError(err, locale);

        expect(fetchTranslation).toHaveBeenCalledWith(expectedMessage, locale);
        expect(result).toBe('Translated default error message');
    });

    it('should use the default locale if none is provided', async () => {
        const err = { message: 'Another error occurred' };
        const expectedMessage = [errorTitle, err.message];

        (fetchTranslation as jest.Mock).mockResolvedValue('Translated error message with default locale');

        const result = await getError(err);

        expect(fetchTranslation).toHaveBeenCalledWith(expectedMessage, 'en');
        expect(result).toBe('Translated error message with default locale');
    });

    it('should handle different locales correctly', async () => {
        const err = { message: 'Localized error' };
        const testLocale = 'fr';
        const expectedMessage = [errorTitle, err.message];

        (fetchTranslation as jest.Mock).mockResolvedValue('Translated error message in French');

        const result = await getError(err, testLocale);

        expect(fetchTranslation).toHaveBeenCalledWith(expectedMessage, testLocale);
        expect(result).toBe('Translated error message in French');
    });
});
