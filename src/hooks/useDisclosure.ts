import { useState } from "react"


type UseDisclosure = (defaultIsOpen: boolean) => UseDisclosureReturn;

interface UseDisclosureReturn {
    isOpen: boolean;
    toggle: () => void;
    setIsOpen: (isOpen: boolean) => void;
}

const useDisclosure: UseDisclosure = (defaultIsOpen) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);
    return {
        isOpen,
        toggle: () => setIsOpen(state => !state),
        setIsOpen: (value) => setIsOpen(value)
    }
}

export default useDisclosure;