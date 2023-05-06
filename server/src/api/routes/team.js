const express = require('express');

const route = express.Router();

//@TODO: team.js 의 경우 기존의 user.js 와 구조가 조금 다름 -> 추후 통일
const teamController = require('../../controllers/team');
const authMiddleware = require('../../middleware/auth');

const teamRouter = ({ app }) => {
    app.use('/api/v1/teams', route);

    route.get('', teamController.getTeams);

    /**
     * @swagger
     * /api/v1/teams/categories:
     *  get:
     *      tags:
     *          - team
     *      description: 팀 카테고리 get
     *      parameters:
     *         - in: query
     *           name: id
     *           required: false
     *           schema:
     *              type: string
     *           description: 카테고리 id
     *         - in: query
     *           name: type
     *           required: false
     *           schema:
     *             type: string
     *           description: 카테고리 타입
     *         - in: query
     *           name: isValid
     *           required: false
     *           schema:
     *             type: string
     *           description: 카테고리 유효성 여부
     *      responses:
     *       200:
     *         description: 성공
     *         content:
     *           application/json:
     *             example:
     *               - code: 200000
     *                 message: success
     *                 result: []
     *       400:
     *         description: 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 400666
     *                 message: 데이터 get 실패
     *       500:
     *         description: 실패
     *         content:
     *           application/json:
     *             example:
     *               - code: 500000
     *                 message: 서버 에러 발생
     */
    route.get('/categories', teamController.getCategories);

    route.post('/stats', authMiddleware.verify, teamController.postStats);
}

module.exports = {
    teamRouter,
};

