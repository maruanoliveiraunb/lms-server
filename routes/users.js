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

// router.post('/user', async (req, res) => {
//     // const user = new User({name: 'Maruan', email: 'maruanoliveira@gmail.com'});
//
//     // const resultUser = await UsersService.getUserByName('Dale');
//
//     // const user = new UsersService('Olivia', 'oliviaoliveira@gmail.com');
//     //
//     // const result = await user.insert();
//
//     const user = new UsersService('Olivia Pessego Oliveira 2', 'oliviaoliveira@gmail.com', '609894cc5cb8584c2df94efd');
//
//     const result = await user.delete();
//
//     console.log('query user', result);
//
//     res.send('Hello user!')
// })

module.exports = router;
