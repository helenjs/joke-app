import {ReactNode} from "react";
import Header from "@components/Header/Header";

interface LayoutProps {
    children: ReactNode;
    error?: string;
}


export default function Layout({
        children,
    }: Readonly<LayoutProps>) {
    return (
        <>
            <Header />
            <main className="max-w-screen-lg m-auto py-5">
                {children}
            </main>
        </>
    );
}

