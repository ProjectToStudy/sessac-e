// 쿼리스트링 읽어서 조건 필드 생성하기
const makeOptions = (data) => {
    const selectFields = [];
    const whereFields = {};
    const orderByFields = [];
    let limitCount = -1;

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
    const option = sortOptions[0];
    switch(option[1]) {
        case 'asc':
            array.sort(function(a, b) {
                if (a[option[0]] < b[option[0]]) return -1;
                if (a[option[0]] > b[option[0]]) return 1;
                return 0;
            });
            break;
        case 'desc':
            array.sort(function(a, b) {
                if (a[option[0]] < b[option[0]]) return -1;
                if (a[option[0]] > b[option[0]]) return 1;
                return 0;
            });
            break;
        default:
            console.log('Invalid method');
    }

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

module.exports = {
    makeOptions,
    sortArray,
    sendToResult,
}
