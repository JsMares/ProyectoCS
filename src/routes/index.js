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

router.get('/ver', async (req, res) => {
    const valores = await Valor.find();
    console.log(valores);
    res.status(200).json({reg: valores})
});

router.get('/del/:id', async (req, res) => {
    const {id} = req.params;
    await Valor.findByIdAndRemove(id);
    res.redirect('/');
});

module.exports = router;