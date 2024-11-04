import { jokesDataMapper } from '@utils/jokesDataMapper';
import {JokeDataSingle} from '@/pages';

const amount = 1;
const mockData: JokeDataSingle = {
    error: false,
    joke: 'Why did the chicken cross the road? To get to the other side!',
    category: "Christmas",
    type: "single",
    id: 241,
};
const mockDataError: JokeDataSingle = {
    ...mockData,
    error: true,
}

describe('jokesDataMapper', () => {
    it('should map data correctly with a valid JokeDataSingle object', () => {
        const result = jokesDataMapper(mockData, amount);

        expect(result).toEqual({
            error: false,
            amount: 1,
            jokes: [mockData],
        });
    });

    it('should correctly map the error property from the data object', () => {
        const amount = 1;

        const result = jokesDataMapper(mockDataError, amount);

        expect(result.error).toBe(true);
    });
});
