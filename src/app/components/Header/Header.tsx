import {useState} from 'react';
import Image from "next/image";
import Select from "@/app/components/Select/Select";
import {supportedLocales} from '@/app/config';
import {useRouter} from 'next/router';

export default function Header() {
    const [,setLang] = useState('');
    const router = useRouter();
    const { locale, pathname } = router;

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = event.target.value;
        setLang(event.target.value);
        router.push(pathname, pathname, { locale: lang })
    };
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
            <Select
                options={supportedLocales}
                value={locale || 'en'}
                onChange={handleLanguageChange}
                placeholder="Select Language"
            />
        </header>
    )
}