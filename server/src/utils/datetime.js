// 날짜, 시간 형식 변경과 관련된 모듈
const dayjs = require('dayjs');
require('dayjs/locale/ko');

dayjs.locale('ko');

const dateTypeMap = {
    time: (date) => {
        return dayjs(date).format('HH:mm:ss');
    },
    date: (date) => {
        return dayjs(date).format('YYYY-MM-DD');
    },
    dateTime: (date) => {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },
    timestamp: (date) => {
        return dayjs(date).valueOf();
    },
    year: (date) => {
        return dayjs(date).get('year');
    },
    day: (date) => {
        return dayjs(date).get('day');
    },
    dayOfWeek: (date) => {
        return dayjs(date).get('d');
    },
    month: (date) => {
        return dayjs(date).get('M');
    },
    monthAndDay: (date) => {
        return dayjs(date).format('MM월 DD일');
    }
}

// 현재 시간과 특정 시간을 비교해서 값을 리턴해주는 함수
function compareToCurrentTime(_datetime) {
    let current = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
    let datetime = dayjs(_datetime).format('YYYY-MM-DD HH:mm:ss');

    return current < datetime ? 1 : 0;
}

function addDatetime(type, amount, datetime) {
    return dayjs(datetime).add(amount, type);
}

module.exports = {
    compareToCurrentTime,
    addDatetime,
};
