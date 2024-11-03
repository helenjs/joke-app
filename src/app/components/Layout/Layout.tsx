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
            <main>
                {children}
            </main>
        </>
    );
}

