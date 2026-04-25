import { useQuery } from "@tanstack/react-query";

const useFetch = ({ url, key }: { url: string; key: string }) => {
    return useQuery({
        queryKey: [key, url],
        queryFn: async () => {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            return response.json();
        },
        staleTime: 1000 * 60 * 5,
    });
};

export default useFetch;