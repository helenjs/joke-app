import {useState, useCallback} from 'react';
import Image from "next/image";
import Select from "@/app/components/Select/Select";
import {supportedLocales} from '@/app/config';
import {useRouter} from 'next/router';

export default function Header() {
    const [,setLang] = useState('');
    const router = useRouter();
    const { locale, pathname } = router;

    const handleLanguageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = event.target.value;
        setLang(event.target.value);
        router.push(pathname, pathname, { locale: lang })
    }, [pathname, router]);

    return (
        <header className='flex justify-between bg-slate-950 p-3'>
            <Image
                className="dark:invert sm:w-44 sm:h-9"
                src="/next.svg"
                alt="Next.js logo"
                width={118}
                height={25}
                priority
            />
            <Select
                options={supportedLocales}
                value={locale || 'en'}
                onChange={handleLanguageChange}
                placeholder="Select Language"
                className="mb-0 w-28 sm:w-36"
            />
        </header>
    )
}