import {JokeDataSingle} from "@/pages";

export const jokesDataMapper = (data: JokeDataSingle, amount: number) => {
    return {
        error: data.error,
        amount: amount,
        jokes: [
            data,
        ]
    };
};