// 쿼리스트링 읽어서 조건 필드 생성하기
const makeOptions = (data) => {
    const selectFields = [];
    const whereFields = {};
    const orderByFields = [];
    let limitCount = null;

    for (const [key, value] of Object.entries(data)) {
        if (!value || key === 'sort' || key === 'fields' || key === 'limit') {
            continue;
        }

        whereFields[key] = value.split(',');
    }

    if (data.fields) {
        const selectColumns = data.fields.split(',');

        for (const column of selectColumns) {

        }
    } else {
        selectFields.push('*');
    }

    if (data.sort) {
        const orderByColumns = data.sort.split(',');

        for (const column of orderByColumns) {
            if (column.startsWith('-')) {
                orderByFields.push([column.slice(1), 'desc']);
            } else {
                orderByFields.push([column, 'asc']);
            }
        }
    }

    if (data.limit) {
        limitCount = Number(data.limit);
    }

    return {
        selectFields,
        whereFields,
        orderByFields,
        limitCount,
    }
}

const sortArray = (array, sortOptions) => {
    const sortFunction = {
        number: (a, b, orderType) => {
            if (orderType === 'asc') {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            } else {
                if (a > b) return -1;
                if (a < b) return 1;
                return 0;
            }
        },
        string: (a, b, orderType) => {
            if (orderType === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        },
        // timestamp
        object: (a, b, orderType) => {
            a = new Date(a);
            b = new Date(b);

            if (orderType === 'asc') {
                return a.getTime() - b.getTime();
            } else {
                return b.getTime() - a.getTime();
            }
        }
    }
    const option = sortOptions[0];
    array.sort(function(a, b) {
        return sortFunction[typeof a[option[0]]](a[option[0]], b[option[0]], option[1]);
    });

    return array;
}

const sendToResult = (result) => {
    if (result) {
        return {
            code: 200000,
            message: 'success',
            result
        };
    } else {
        return {
            //@TODO: 에러코드 설정
            code: 400666,
        };
    }
}

// create, update 시 데이터 유효성 검사
const validateData = (data) => {
    // data 객체의 각 항목 하나하나가 sql 취약 데이터인지 검사
    // 취약 데이터가 있으면 false, 없으면 true 반환
    try {
        for(const input of Object.values(data)) {
            // <script> 태그 필터링
            if (input.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi)) {
                return false;
            }

            // on으로 시작하는 이벤트 핸들러 필터링
            if (input.match(/on\w+="[^"]+"/g)) {
                return false;
            }
        }

        return data;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    makeOptions,
    sortArray,
    sendToResult,
    validateData,
}
