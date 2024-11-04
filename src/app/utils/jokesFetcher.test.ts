import { fetchJokes } from '@utils/jokesFetcher';

describe('fetchJokes', () => {
    const mockJokes = { jokes: [{ id: 1, joke: 'Funny joke' }] };
    const count = 1;
    global.fetch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch jokes successfully', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockJokes,
        });

        const result = await fetchJokes(count);

        expect(fetch).toHaveBeenCalled();
        expect(result).toEqual(mockJokes);
    });

    it('should throw an error when the fetch fails', async () => {
        // Mock fetch to return a failed response
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
        });

        await expect(fetchJokes(count)).rejects.toThrow('Failed to fetch jokes list');
    });
});