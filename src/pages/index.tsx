import "@/app/globals.css";
import {fetchJokes} from "@utils/jokesFetcher";
import Head from "next/head";
import {twMerge} from "tailwind-merge";
import {jokesDataCount} from "@/app/config";
import Error from "@components/Error/Error";
import {fetchTranslation} from "@utils/translateFetcher";
import {GetServerSidePropsContext} from 'next';

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
const jokeItemClass = "flex before:content-['-'] gap-1";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { locale } = context;
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
    const textsToTranslate = cachedJokesData?.jokes?.map(({type, joke, setup, delivery}: Partial<JokeData>) => {
        if(type === 'single' && joke) {
            return joke.replace('\n', '<br>') ;
        }
        return `${setup}<br>${delivery}`;
    });
    const translatedData = textsToTranslate ? await fetchTranslation(textsToTranslate, locale) : [];
    const formattedTranslate = translatedData.map((joke: string) => joke.split('<br>'));

    return { props: { jokeList: formattedTranslate, error }};
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

