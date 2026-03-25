type RequestOptions = RequestInit & {
    token?: string;
};

export const apiClient = async <T>(
    url: string,
    options?: RequestOptions
): Promise<T> => {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(options?.token && { Authorization: `Bearer ${options.token}` }),
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Something went wrong');
    }

    return res.json();
};