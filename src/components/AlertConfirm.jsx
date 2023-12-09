import { useEffect, useState } from 'react';

function AlertConfirm(props) {
    const [dots, setDots] = useState(1);
    const classChangeColor = props.colorFondo ? 'bg-green-300' : '';

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDots((prevDots) => (prevDots % 3) + 1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [dots]);

    return (
        <>
            <div className={`${classChangeColor} border-t border-b px-16 py-3 animate-bounce fixed top-10 left-1/3 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-in-out`}>
                <div className='flex items-center justify-center'>
                    {props.icono ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <p className="ml-3 font-bold">{props.textBig}</p>
                </div>
                <p className="text-sm">{props.textLittle}</p>
            </div>
        </>
    );
}

export default AlertConfirm;
