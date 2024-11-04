import "@/app/globals.css";
import {fetchJokes} from "@utils/jokesFetcher";
import Head from "next/head";

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
}

let cachedJokesData: JokeFullListData | null = null;

export async function getServerSideProps() {
    try {
        cachedJokesData = await fetchJokes(5);
    } catch (err: unknown) {
        console.error('Failed to fetch jokes list');
    }

    return { props: { jokeList: cachedJokesData }};
}

const TITLE_PAGE = 'Jokes list';

const Page = ({ jokeList }: PageProps) => {
    return (
        <div>
            <Head>
                <title>{TITLE_PAGE}</title>
                <meta property="og:title" content={TITLE_PAGE} key="title"/>
            </Head>
            Page Content
        </div>
    );
};

export default Page;

