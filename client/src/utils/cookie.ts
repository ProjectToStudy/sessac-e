export const setAccessToken = (value: string) => {
    const loc = window.location.href;
    if (loc.includes('localhost')) {
        console.log('localhost');
        document.cookie = 'accessToken=' + value + ';path=/;max-age=3600;secure';
    }
};

export const getAccessToken = () => {
    const cookie = document.cookie.split(';');
    for (let i = 0; i < cookie.length; i++) {
        let x = cookie[i].substring(0, cookie[i].indexOf('='));
        const y = cookie[i].substring(cookie[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x === 'accessToken') return y;
    }
}
