export const setCookie = (key: string, value: string) => {
    document.cookie = key + '=' + value + ';path=/;max-age=3600;secure';
};
