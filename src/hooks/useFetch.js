import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_REST_API + url)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
    }, [url]);

    return [data, isLoading];
}
