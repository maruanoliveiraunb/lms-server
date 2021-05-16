const router = require('express').Router();
const UsersService = require('../services/users');

router.get('/user/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await UsersService.getById(id);
    res.send(result)
})

router.post('/user', async (req, res) => {
    const { body } = req;
    const { name, email } = body;
    const user = new UsersService({ name, email });
    const result = await user.insert();
    res.send(result);
})

router.post('/user/update', async (req, res) => {
    const { body } = req;
    const { id, name } = body;
    const user = new UsersService({ id, name });
    const result = await user.update();
    res.send(result);
})

router.delete('/user/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    const result = await UsersService.deleteById(id);
    res.send(result)
})

module.exports = router;
