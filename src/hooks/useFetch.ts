import axios from "axios";
import { useState, useEffect } from "react";

type UseFetch = (url: string) => UseFetchReturn;

interface UseFetchReturn {
    error: boolean;
    data: any
}

const useFetch: UseFetch = (url) => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(url).then((data) => setData(data.data)).catch(() => setError(true))
    }, [url])

    return {
        data,
        error
    }
}

export default useFetch;