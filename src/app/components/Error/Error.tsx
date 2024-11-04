import {errorTitle} from '@/app/config';
interface ErrorProps {
    error: string;
}

export default function Error({error}: ErrorProps) {
    return (
        <div className="w-max-500 text-center m-auto">
            <h3 className="text-red-700 font-bold">
                {errorTitle},
            </h3>
            <p>{error}</p>
        </div>
    )
}