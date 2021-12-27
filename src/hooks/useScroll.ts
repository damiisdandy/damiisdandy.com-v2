import { useEffect, useState } from 'react';

type UseScroll = () => { position: number; ratio: number };

const useScroll: UseScroll = () => {
    const [position, setPosition] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);

    const handleScroll = () => {
        setPosition(window.scrollY);
    }

    useEffect(() => {
        setScrollHeight(window.document.body.scrollHeight);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    return { position, ratio: (position / scrollHeight) };
}

export default useScroll;