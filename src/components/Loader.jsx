import { useEffect, useState } from 'react'

function Loader(props) {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDots((prevDots) => (prevDots % 3) + 1)
        }, 500)

        return () => clearTimeout(timeout)
    }, [dots])

    if (props.load) {
        return (
            <>
                <div className="bg-green-300 border-t border-b border-green-500 text-green-700 px-4 py-3 animate-bounce fixed top-5 w-1/2 transform transition-transform duration-1000 ease-in-out">
                    <p className="font-bold">Successful registration!</p>
                    <p className="text-sm">A new user has been added to the system</p>
                </div>

            </>
        )
    }

    return
}

export default Loader