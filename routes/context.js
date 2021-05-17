const router = require('express').Router();
const ContextService = require('../services/context');

router.get('/context/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await ContextService.getById(id);
    res.send(result)
})

router.post('/context', async (req, res) => {
    const { body } = req;
    const { name, type } = body;
    const context = new ContextService({ name, type });
    const result = await context.insert();
    res.send(result);
})

router.post('/context/update', async (req, res) => {
    const { body } = req;
    const { id, name, type, users, lineItems } = body;
    const context = new ContextService({ id, name, type, users, lineItems });
    const result = await context.update();
    res.send(result);
})

router.delete('/context/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await ContextService.deleteById(id);
    res.send(result)
})

module.exports = router;
