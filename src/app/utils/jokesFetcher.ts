import {JokeFullListData} from '@/pages';

const JOKES_API_URL = 'https://v2.jokeapi.dev/joke/Any';

/**
 * fetchJokes - Function for fetching a list of jokes from the API
 * @param {number} count - The number of joke items to fetch from the API
 * @returns {Promise<JokeFullListData>} - A promise that resolves with the jokes data in JSON format
 * @throws {Error} - Throws an error if the API response is not ok
 */
export const fetchJokes = async (count: number): Promise<JokeFullListData> => {
    const defaultParams = 'blacklistFlags=nsfw,religious,political,racist,sexist';
    const response = await fetch(`${JOKES_API_URL}?${defaultParams}&amount=${count}`);

    if (!response.ok) {
        throw new Error('Failed to fetch jokes list');
    }
    return await response.json();
};