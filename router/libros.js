const express = require('express');
const router = express.Router();

const Libro = require("../models/Libro");

const { requieredScopes } = require('express-oauth2-jwt-bearer');

// Ruta para obtener tosos los libros:
router.get('/', requieredScopes("read:libros"), async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
});


// Ruta para crear un nuevo libro:
router.post('/', requieredScopes("write:libros"), async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();
    res.json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: "Error al crear un libro" });
  }
});


// Ruta para actualizar un libro ya exsistente:
router.put('/:id', requieredScopes("write:libros"), async (req, res) => {
  try {
    const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(Libro);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar un libro ya exsistente" });
  }
});


// Ruta para eliminar un libro:
router.delete('/:id', requieredScopes("write:libros"), async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ message: 'Se ha eliminado el libro correctamente' });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
});

module.exports = router;