const express = require('express');
const router = express.Router();
const pool = require('../database');
const  {isLoggedIn} = require('../lib/auth');


router.get('/add', isLoggedIn, (req, res) =>{
res.render('links/add');
});

router.post('/add',  async (req, res) =>{
    const {title, url, description } = req.body;
const newLink ={
title,
url,
description,


}; //agregar user_id: req.user.id abajo de description
await pool.query('INSERT INTO links set?', [newLink]);
req.flash('success', 'Enlace agregado');
res.redirect('/links');
});


// en la siguiente linea cambiar por const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links', [req.user.id]);
res.render('links/list', {links});
});

router.get('/delete/:id', isLoggedIn, async (req, res) =>{
   const { id } = req.params;
   await pool.query('DELETE FROM links WHERE ID = ?', [id]);
   req.flash('success', 'Enlace borrado');
res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('./links/edit', {link: links[0]});
 });


 router.post('/edit/:id', isLoggedIn, async (req,res) =>{
    const { id } = req.params;
    const { title, url, description } = req.body;
const newLink ={
    title,
    url,
    description
};


await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
req.flash('success', 'Enlace editado correctamente');
res.redirect('/links');
});


module.exports = router;  