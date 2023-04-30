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

module.exports = {
    makeOptions,
    sortArray,
    sendToResult,
}
