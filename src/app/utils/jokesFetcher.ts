const JOKES_API_URL = 'https://v2.jokeapi.dev/joke/Any';

export const fetchJokes = async (count: number) => {
    const defaultParams = 'blacklistFlags=nsfw,religious,political,racist,sexist';
    const response = await fetch(`${JOKES_API_URL}?${defaultParams}&amount=${count}`);

    if (!response.ok) {
        throw new Error('Failed to fetch jokes list');
    }
    return await response.json();
};