import "@/app/globals.css";
import {fetchJokes} from "@utils/jokesFetcher";
import Head from "next/head";
import {twMerge} from "tailwind-merge";
import {jokesDataCount} from "@/app/config";
import Error from "@components/Error/Error";

interface JokeFullListData {
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

interface PageProps {
    jokeList?: any;
    error? : string | null;
}

let cachedJokesData: JokeFullListData | null = null;
let error: string | null = null;

const beforeElmBorder = twMerge(
    'before:content-[""]',
    'before:-left-5 before:-right-5 before:bottom-0',
    'before:absolute before:h-px before:bg-black',
    'before:block',
    'last:before:hidden'
);

export async function getServerSideProps() {
    if (!cachedJokesData) {
        try {
            cachedJokesData = await fetchJokes(jokesDataCount);
            if (cachedJokesData?.error) {
                error = 'Failed to fetch jokes list';
                return;
            }
        } catch (err: unknown) {
            error = err.message ?? 'Failed to fetch jokes list';
        }
    }

    return { props: { jokeList: cachedJokesData?.jokes ?? [], error }};
}

const TITLE_PAGE = 'Jokes';

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
            <ol className="list-decimal">
                {jokeList?.map(({type, joke, setup, delivery}: JokeData, index: number) => (
                    <li key={`joke-${index}`} className={twMerge('relative py-2', beforeElmBorder)}>
                        {type === 'single' ? (joke) : (
                            <>
                                <p>- {setup}</p>
                                <p>- {delivery}</p>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Page;

