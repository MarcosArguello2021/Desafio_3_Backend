const { promises: fs } = require('fs');

class Contenedor {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(data) {

        const objetos = await this.getAll();

        let newId;
        if (objetos.length == 0) {
            newId = 1;
        } else {
            const ultimoId = parseInt(objetos[objetos.length - 1].id);
            newId = ultimoId + 1;
        }

        objetos.push({
            ...data, id: newId
        });

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getById(id) {

        try {
            const productos = await this.getAll();
            const producto = productos.filter(producto => producto.id === id);
            if (producto.length === 0) {
                return null;
            } else {
                return producto;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async getAll() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(objetos);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        const objetos = await this.getAll();
        const items = objetos.filter(item => item.id !== id);
        if (items.length === objetos.length) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`);
        }
        try {
            await fs.writeFile(this.ruta, JSON.stringify(items, null, 2));
        } catch (error) {
            throw new Error(`Error al guardar el cambio ${error}`);
        }
    }

    async deleteAll() {
        try {
            const productos = [];
            fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = {Contenedor};


