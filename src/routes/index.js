const express = require('express');
const router = express.Router();
const model = require('../model/datos')();

const Valor = require('../model/datos');

router.get('/', async (req, res) => {
    const datos = await Valor.find();
    console.log(datos);
    res.render('index.ejs',{
        datos
    });
});

router.post('/add', async (req, res) => {
    const valor = new Valor(req.body);
    await valor.save();
    res.redirect('/');
});

module.exports = router;