const express = require('express');
const router = express.Router();
const model = require('../model/datos')();

const Valor = require('../model/datos');
const users = require('../model/users');
const User = require('../model/users');

router.get('/', async (req, res) =>{
    const datos = await Valor.find();
    console.log(datos);
    res.render('login.ejs',{
        datos
    });
});

router.get('/inicio', async (req, res) => {
    const datos = await Valor.find();
    console.log(datos);
    res.render('index.ejs',{
        datos
    });
});

router.get('/redirigir', async(req, res) => {
    res.render('registro.ejs');
});

router.post('/add', async (req, res) => {
    const valor = new Valor(req.body);
    await valor.save();
    res.redirect('/inicio');
});

router.post('/register', async (req, res) => {
    const name = new User(req.body);
    await name.save();
    res.render('login.ejs');
});

router.post('/validacion', async (req, res) => {
    const {username, password} = req.body;
    
    User.findOne({username}, (err, user) => {
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE');
        }else{
            user.isCorrectPassword(password, (err, result) => {
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR');
                }else if(result){
                    res.redirect('/inicio');
                }else{
                    res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
                }
            });
        }
    });
});

router.get('/ver', async (req, res) => {
    const valores = await Valor.find();
    console.log(valores);
    res.status(200).json({reg: valores})
});

router.get('/del/:id', async (req, res) => {
    const {id} = req.params;
    await Valor.findByIdAndRemove(id);
    res.redirect('/inicio');
});

router.get('/editar/:id', async (req, res) => {
    try{
        const informacion = await Valor.findById(req.params.id).lean();
        const datos = await Valor.find();
        console.log(informacion);
        res.render('editar.ejs', {informacion, datos});
    } catch (error){
        console.log(error.message);
    }
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    await Valor.findByIdAndUpdate(id, req.body);
    res.redirect('/');
});

module.exports = router;