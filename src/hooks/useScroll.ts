import { useEffect, useState } from 'react';

type UseScroll = () => { position: number; ratio: number };

const useScroll: UseScroll = () => {
    const [position, setPosition] = useState(0);

    const handleScroll = () => {
        setPosition(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    return { position, ratio: (position / window.document.body.scrollHeight) };
}

export default useScroll;