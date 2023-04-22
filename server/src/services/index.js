// 쿼리스트링 읽어서 조건 필드 생성하기
const makeOptions = (data) => {
    const selectFields = [];
    const whereFields = {};
    const orderByFields = [];

    for (const [key, value] of Object.entries(data)) {
        if (!value || key === 'sort' || key === 'field') {
            continue;
        }

        whereFields[key] = value.split(',');
    }

    if (data.field) {
        const selectColumns = data.field.split(',');

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

    return {
        selectFields,
        whereFields,
        orderByFields
    }
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
    sendToResult,
}
