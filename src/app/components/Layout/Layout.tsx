import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
    error?: string;
}


export default function Layout({
        children,
    }: Readonly<LayoutProps>) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    );
}

