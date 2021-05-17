const router = require('express').Router();
const LineItemsService = require('../services/lineItems');

router.get('/lineitem/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await LineItemsService.getById(id);
    res.send(result)
})

router.post('/lineitem', async (req, res) => {
    const { body } = req;
    const { title, description } = body;
    const lineItem = new LineItemsService({ title, description });
    const result = await lineItem.insert();
    res.send(result);
})

router.post('/lineitem/update', async (req, res) => {
    const { body } = req;
    const { id, title, description } = body;
    const lineItem = new LineItemsService({ id, title, description });
    const result = await lineItem.update();
    res.send(result);
})

router.delete('/lineitem/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await LineItemsService.deleteById(id);
    res.send(result)
})

module.exports = router;
