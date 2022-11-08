const express = require('express')
const Container = require('./container/archivosContainer')
const app = express()
const PORT = 8080
const moment = require('moment')
const archivo = new Container('productos.txt')


const visitas = {
    products: 0,
    fecha_visita_productos: '',
    prod_random:0,
    fecha_visita_productos_random: ''
}

app.get('/productos', async (req,res) => {
    visitas.products++;
    visitas.fecha_visita_productos = moment().format('MMMM Do YYYY, h:mm:ss a' )
    const prods = await archivo.leer()
    res.send({Productos: prods})
})

app.get('/productoRandom' , async (req, res) => {
    visitas.prod_random++;
    visitas.fecha_visita_productos_random = moment().format('MMMM Do YYYY, h:mm:ss a' )
    const prods = await archivo.leer()
    const getRandom = parseInt(Math.random()*prods.length)
    res.send({Productos: prods[getRandom]})
})


app.get('/visitas' , async (req, res) => {
    res.send({visitas})
})

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el pto: ${PORT}`);
})

