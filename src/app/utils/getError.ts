import {errorTitle} from "@/app/config";
import {fetchTranslation} from "@utils/translateFetcher";

interface ErrorProps {
    message?: string;
    code?: string;
    status?: number;
}

export const getError = async(err: ErrorProps, locale : string ='en') => {
    const errorMessage = err.message || 'Unexpected error happened';
    const fullErrorText = [errorTitle, errorMessage]
    return await fetchTranslation(fullErrorText, locale || 'en');
}