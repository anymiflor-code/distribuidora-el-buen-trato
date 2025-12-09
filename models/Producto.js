const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 2
  },
  marca: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  unidades: {
    type: Number,
    required: true,
    min: 0
  },
  presentacion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
})

productoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Producto', productoSchema)