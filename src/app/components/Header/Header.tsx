import Image from "next/image";

export default function Header() {
    return (
        <header className='flex justify-between bg-slate-950 p-3'>
            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
        </header>
    )
}