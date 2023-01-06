export const setCookie = (key: string, value: string) => {
    document.cookie = key + '=' + value + ';path=/;max-age=3600;secure';
};

export const getCookie = (key: string) => {
    const cookie = document.cookie.split(';');
    for (let i = 0; i < cookie.length; i++) {
        let x = cookie[i].substring(0, cookie[i].indexOf('='));
        const y = cookie[i].substring(cookie[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x === key) return y;
    }
}
