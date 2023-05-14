const Joi = require('joi');

const validationPostTeams = (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        userPhone: Joi.string().required(),
        name: Joi.string().required().max(22),
        description: Joi.string().required(),
        capacity: Joi.number().required(),
        sessionCount: Joi.number().integer().min(1).required(), // 진행 횟수
        isApproval: Joi.boolean().default(false), // 승인제 여부
        teamAreaInfoId: Joi.number().default(1), // 지역 정보
        category: Joi.array().items(Joi.number().integer().min(1).max(16)).required().min(1),
        channel: Joi.array().items(Joi.number().integer().min(0).max(1)).default([1, 0]), // [온라인, 오프라인]
        recruitStartDate: Joi.date().required(),
        recruitEndDate: Joi.date().required(),
        isRecruit: Joi.boolean().default(false), // 기간 종료 후 추가 모집 여부
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        image: Joi.array().items(
            Joi.object({
                imageUrl: Joi.string().required(),
                sortNo: Joi.number().required(),
            })
        ).required().min(1),
    }).required();

    const validData = checkValidation(schema, req, res);
    if (validData) next();
}

const checkValidation = async (schema, req, res) => {
    try {
        let data = {};

        if (req.user) {
            data.userId = req.user.id;
            data.userPhone = req.user.phone;
        }

        if (req.body) {
            data = {...data, ...req.body};
        }

        if (req.query) {
            data = {...data, ...req.query};
        }

        if (req.params) {
            data = {...data, ...req.params};
        }

        const {error, value} = schema.validate(data);

        if (error) {
            res.status(400).json({
                code: 400555,
                error: error.details[0].message
            });
            return false;
        }

        req.body = value;
        return true;
    } catch (err) {
        res.status(500).json({
            code: 500000,
            error: 'Internal Server Error'
        });
        return false;
    }
}

module.exports = {
    validationPostTeams,
}