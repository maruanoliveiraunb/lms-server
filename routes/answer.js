const router = require('express').Router();
const LineItemService = require('../services/lineItems');
const AnswerService = require('../services/answers');

router.get('/answer/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await AnswerService.getById(id);
    res.send(result);
})

router.post('/answer', async (req, res) => {
    const { body } = req;
    const { lineItemId, file, learner } = body;
    const answer = new AnswerService({ file, learner });
    const result = await answer.insert();
    const { status, data } = result;
    if (status === 200) {
        const lineItemResult = await LineItemService.updateAnswers(lineItemId, data);
        res.send(lineItemResult);
    } else {
        res.send(result);
    }
})

router.post('/answer/update', async (req, res) => {
    const { body } = req;
    const { id, feedback, grade, learner, instructor } = body;
    const answer = new AnswerService({ id, feedback, grade, learner, instructor });
    const result = await answer.update();
    res.send(result);
})

router.delete('/answer/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await AnswerService.deleteById(id);
    res.send(result)
})

module.exports = router;
