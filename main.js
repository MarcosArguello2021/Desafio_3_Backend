const express = require('express');
const { Contenedor } = require('./fileClass');
const listaProductos = new Contenedor('./productos.txt');
const PORT = 8080;

const app = express();
const server = app.listen(PORT, ()=>{
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el server: ${error}`));

app.get('/productos', async (req, res) => {
    try {
        const productos = await listaProductos.getAll();
        res.json(productos); 
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
})

app.get('/productoRandom', async (req, res) => {
    try {
      const productos = await listaProductos.getAll();
      const idProductos = productos.map(item => item.id);
      const random = Math.floor(Math.random() * (idProductos.length)) + 1;
      const productoRandom = await listaProductos.getById(random);
      res.json(productoRandom);
    } catch (err) {
      res.status(500).send(`Error en el servidor ${err}`);
    }
});