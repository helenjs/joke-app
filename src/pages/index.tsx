import "@/app/globals.css";
import {fetchJokes} from "@utils/jokesFetcher";
import Head from "next/head";
import {twMerge} from "tailwind-merge";
import {errorTitle, jokesDataCount} from "@/app/config";
import Error from "@components/Error/Error";
import {fetchTranslation} from "@utils/translateFetcher";
import {GetServerSidePropsContext} from 'next';
import {getError} from "@utils/getError";
import {jokesDataMapper} from "@utils/jokesDataMapper";

export interface JokeFullListData {
    error: boolean;
    amount: number;
    jokes: JokeData[];
}

export interface JokeData {
    category: string;
    type: string;
    joke?: string;
    setup?: string;
    delivery?: string;
    id: number;
}

export interface JokeDataSingle extends JokeData{
    error: boolean;
}

interface ErrorProps {
    message: string;
    code?: string;
    status?: number;
}

interface PageProps {
    jokeList?: string[][];
    error? : string[] | null;
}

let cachedJokesData: JokeFullListData | null = null;
let error: string[] | null = null;

const beforeElmBorder = twMerge(
    'before:content-[""]',
    'before:-start-10 before:-end-5 before:bottom-0',
    'before:absolute before:h-px before:bg-black',
    'before:block',
    'last:before:hidden'
);
const jokeItemClass = "flex before:content-['-'] gap-1";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { locale } = context;
    // Fetch jokes data if it hasn't already been cached
    if (!cachedJokesData) {
        try {
            const jokesApiResponse = await fetchJokes(jokesDataCount);
            // Handle error in jokes API response
            if (jokesApiResponse?.error) {
                const ERROR = 'Failed to fetch jokes list';
                error = await getError({message: ERROR}, locale);
                return;
            }
            if (jokesDataCount === 1) {
                // Jokes data is different if only one joke item was requested, jokesDataMapper return the same structure as list of jokes.
                cachedJokesData = jokesDataMapper(jokesApiResponse as JokeDataSingle, jokesDataCount);
            } else {
                cachedJokesData = jokesApiResponse as JokeFullListData;
            }
        } catch (err: unknown) {
            error = await getError(err as ErrorProps, locale);
        }
    }
    const textsToTranslate = cachedJokesData?.jokes?.map(({type, joke, setup, delivery}: Partial<JokeData>) => {
        if(type === 'single' && joke) {
            return joke.replace('\n', '<br>') ;
        }
        return `${setup}<br>${delivery}`;
    });
    let translatedData = [];
    if (textsToTranslate) {
        try {
            translatedData = await fetchTranslation(textsToTranslate, locale || 'en');
        } catch(err: unknown) {
            error = [errorTitle, String(err)] as string[];
        }
    }
    const formattedTranslate = translatedData.map((joke: string) => joke.split('<br>'));
    return { props: { jokeList: formattedTranslate, error }};
}

const TITLE_PAGE = 'Jokes'; //title is necessary for SEO

const Page = ({ jokeList, error }: PageProps) => {
    if (error) {
        return <Error error={error} />
    }

    return (
        <div>
            <Head>
                <title>{TITLE_PAGE}</title>
                <meta property="og:title" content={TITLE_PAGE} key="title"/>
            </Head>
            <ol className="list-decimal ps-5">
                {jokeList?.map((joke: string[], index: number) => (
                    <li key={`joke-${index}`} className={twMerge('relative py-2', beforeElmBorder)}>
                        {joke.map((item, index) => (
                            <div className={jokeItemClass} key={`joke-${index}-line-${index}`}>{item}</div>
                        ))}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Page;

