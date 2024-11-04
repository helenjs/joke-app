import {errorTitle} from "@/app/config";
import {fetchTranslation} from "@utils/translateFetcher";

interface ErrorProps {
    message?: string;
    code?: string;
    status?: number;
}

/**
 * getError - Function to retrieve and translate error information
 * @param {ErrorProps} err - An object containing error details (message, code, status)
 * @param {string} [locale='en'] - The locale to use for translating the error message (defaults to English)
 * @returns - A promise that resolves with the translated error message
 * @throws {Error} - Throws an error if the translation fetch fails
 */

export const getError = async(err: ErrorProps, locale : string ='en') => {
    const errorMessage = err.message || 'Unexpected error happened';
    const fullErrorText = [errorTitle, errorMessage]
    return await fetchTranslation(fullErrorText, locale || 'en');
}