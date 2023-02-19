const db = require('../../models');

// 쿼리스트링 읽어서 조건 필드 생성하기
const makeOptions = (data) => {
    const whereFields = {};
    const orderByFields = [];

    for (const [key, value] of Object.entries(data)) {
        if (!value || key === 'orderby') {
            continue;
        }

        whereFields[key] = value.split(',');
    }

    if (data.orderby) {
        const orderByColumns = data.orderby.split(',');

        for (const column of orderByColumns) {
            if (column.startsWith('-')) {
                orderByFields.push([column.slice(1), 'desc']);
            } else {
                orderByFields.push([column, 'asc']);
            }
        }
    }

    return {
        whereFields,
        orderByFields
    }
}

const findAllCategories = async (data) => {
    try {
        const {whereFields, orderByFields} = makeOptions(data);

        const result = await db.categoryInfo.findAll({
            attributes: ['id', 'category', 'name', 'type', 'isValid'],
            where: whereFields,
            order: orderByFields,
            raw: true,
        });

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
    } catch (e) {
        throw e;
    }
}

module.exports = {
    findAllCategories,
}
