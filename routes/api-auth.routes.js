const { Router } = require('express');
const { hashSync, compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const User = require('../models/user');
const router = Router();

const generateToken = payload => sign(payload, 'secret_key', { expiresIn: '24h' });


router.get('/users', async (req, res) => {
    const users = await User.find();

    res.json(users);
})

router.post('/registration', async (req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'Заполнены не все поля'});

        const candidate = await User.findOne({ email });

        if (candidate) return res.status(400).json({ message: 'Пользователь уже существует'});

        const user = new User({ email, password: hashSync(password, 7) })

        await user.save();

        return res.status(200).json({ message: 'Пользователь успешно создан', id: user._id });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Server error'});
    }
})

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Заполнены не все поля'});
        }

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Пользователь не найден'});

        const validPassword = compareSync(password, user.password);

        if (!validPassword) return res.status(400).json({ message: 'Пароль не верный'});

        return res.status(200).json({
            token: generateToken({ id: user._id , roles: user.roles }),
            userId: user._id
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Server error'});
    }
})

module.exports = router;
