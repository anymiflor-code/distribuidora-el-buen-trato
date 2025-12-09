require('dotenv').config()
const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Producto = require('./models/Producto')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('dist'))

// Conectar a MongoDB
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

console.log('Conectando a MongoDB...')
mongoose.connect(url)
  .then(() => {
    console.log('✅ Conectado a MongoDB')
    inicializarDatos() // Insertar datos iniciales si es necesario
  })
  .catch(error => {
    console.log('❌ Error conectando a MongoDB:', error.message)
  })

// ========== FUNCIÓN PARA INICIALIZAR DATOS ==========
async function inicializarDatos() {
  try {
    const count = await Producto.countDocuments()
    
    if (count === 0) {
      console.log('📦 Insertando productos iniciales...')
      
      const productosIniciales = [
        {
          nombre: "Arroz Extra",
          marca: "La Cigüeña",
          categoria: "cereales",
          precio: 25.50,
          unidades: 100,
          presentacion: "Bolsa 1kg",
          imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
          descripcion: "Arroz de grano largo, ideal para todo tipo de platillos"
        },
        {
          nombre: "Frijol Negro",
          marca: "La Costeña",
          categoria: "cereales", 
          precio: 32.00,
          unidades: 80,
          presentacion: "Bolsa 1kg",
          imagen: 'https://images.unsplash.com/photo-1543831113-c823c4a606b6?w=400&h=300&fit=crop',
          descripcion: "Frijol negro de primera calidad"
        },
        {
          nombre: "Papas Fritas",
          marca: "Backed",
          categoria: "botanas",
          precio: 15.00,
          unidades: 150,
          presentacion: "Bolsa 45g",
          imagen: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop",
          descripcion: "Papas fritas con sal"
        },
        {
          nombre: "Leche Entera",
          marca: "Itambé",
          categoria: "lácteos",
          precio: 22.00,
          unidades: 120,
          presentacion: "Caja 1L",
          imagen: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
          descripcion: "Leche entera pasteurizada"
        },
        {
          nombre: "Refresco de Cola",
          marca: "Coca-Cola",
          categoria: "bebidas",
          precio: 18.00,
          unidades: 200,
          presentacion: "Botella 600ml",
          imagen: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop',
          descripcion: "Refresco de cola familiar"
        },
        {
          nombre: "Aceite de Girasol",
          marca: "Cristal",
          categoria: "aceites",
          precio: 42.00,
          unidades: 75,
          presentacion: "Botella 1L",
          imagen: "https://images.unsplash.com/photo-1662058595162-10e024b1a907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNlaXRlJTIwZGUlMjBnaXJhc29sfGVufDB8fDB8fHww",
          descripcion: "Aceite de girasol refinado"
        },
        {
          nombre: "Atún en Agua",
          marca: "Herdez",
          categoria: "enlatados",
          precio: 18.50,
          unidades: 120,
          presentacion: "Lata 140g",
          imagen: "https://images.unsplash.com/photo-1590769383363-5681e57ff10f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGF0YSUyMGRlJTIwYXR1bnxlbnwwfHwwfHx8MA%3D%3D",
          descripcion: "Atún claro en agua, bajo en grasa"
        },
        {
          nombre: "Jugo de Naranja",
          marca: "Jumex",
          categoria: "bebidas",
          precio: 22.00,
          unidades: 90,
          presentacion: "Tetra 1L",
          imagen: "https://images.unsplash.com/photo-1587015990127-424b954e38b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGp1Z28lMjBkZSUyMG5hcmFuamF8ZW58MHx8MHx8fDA%3D",
          descripcion: "Jugo de naranja 100% natural"
        },
        {
          nombre: "Yogurt Natural",
          marca: "Danone",
          categoria: "lácteos",
          precio: 15.00,
          unidades: 150,
          presentacion: "Envase 1kg",
          imagen: "https://images.unsplash.com/photo-1604095853918-1a1823a63dd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eW9ndXJ0fGVufDB8fDB8fHww",
          descripcion: "Yogurt natural sin azúcar añadida"
        },
        {
          nombre: "Detergente Líquido",
          marca: "Foca",
          categoria: "limpieza",
          precio: 58.00,
          unidades: 60,
          presentacion: "Botella 2L",
          imagen: "https://images.unsplash.com/photo-1624372635282-b324bcdd4907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGV0ZXJnZW50ZXxlbnwwfHwwfHx8MA%3D%3D",
          descripcion: "Detergente líquido para ropa"
        },
        {
        nombre: "Galletas Alegria",
          marca: "Gamesa",
          categoria: "botanas",
          precio: 28.00,
          unidades: 200,
          presentacion: "Paquete 600g",
          imagen: "https://images.unsplash.com/photo-1690983318341-598b223c6560?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FsbGV0YXxlbnwwfHwwfHx8MA%3D%3D",
          descripcion: "Galletas María clásicas"
        },
        {
          nombre: "Café Molido",
          marca: "Nescafé",
          categoria: "bebidas",
          precio: 85.00,
          unidades: 50,
          presentacion: "Frasco 200g",
          imagen: "https://images.unsplash.com/photo-1626836937739-3037bda1b661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmVzY2FmZXxlbnwwfHwwfHx8MA%3D%3D",
          descripcion: "Café molido 100% arábigo"
        },
        {
          nombre: "Azúcar Morena",
          marca: "Zulka",
          categoria: "cereales",
          precio: 28.00,
          unidades: 90,
          presentacion: "Bolsa 1kg",
          imagen: "https://images.unsplash.com/photo-1706524077192-fbff369d4e0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXp1Y2FyJTIwYm9sc2ElMjBwcm9kdWN0b3xlbnwwfHwwfHx8MA%3D%3D",
          descripcion: "Azúcar morena natural sin refinar"
        },
        {
          nombre: "Sal de Mesa",
          marca: "La Fina",
          categoria: "despensa",
          precio: 12.00,
          unidades: 200,
          presentacion: "Bolsa 1kg",
          imagen: "https://images.unsplash.com/photo-1646722670581-974d084e0ec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbCUyMGRlJTIwbWVzYXxlbnwwfHwwfHx8MA%3D%3D",
          descripcion: "Sal de mesa yodada"
        },
        {
          nombre: "Huevos Frescos",
          marca: "San Juan",
          categoria: "lácteos",
          precio: 42.00,
          unidades: 180,
          presentacion: "Paquete 12 piezas",
          imagen: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHVldm9zfGVufDB8fDB8fHww",
          descripcion: "Huevos frescos de gallina"
        },
        {
          nombre: "Pan Blanco",
          marca: "Bimbo",
          categoria: "panadería",
          precio: 34.00,
          unidades: 130,
          presentacion: "Bolsa 680g",
          imagen: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=300&fit=crop",
          descripcion: "Pan blanco suave y esponjoso"
        },
        {
          nombre: "Queso Manchego",
          marca: "Lala",
          categoria: "lácteos",
          precio: 65.00,
          unidades: 70,
          presentacion: "Paquete 400g",
          imagen: "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVlc298ZW58MHx8MHx8fDA%3D",
          descripcion: "Queso manchego ideal para fundir"
        },
        {
          nombre: "Manzanas Rojas",
          marca: "Del Campo",
          categoria: "frutas",
          precio: 36.00,
          unidades: 110,
          presentacion: "Bolsa 1kg",
          imagen: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop",
          descripcion: "Manzanas rojas frescas y crujientes"
        },
        {
          nombre: "Tomate Saladet",
          marca: "Del Huerto",
          categoria: "verduras",
          precio: 22.00,
          unidades: 150,
          presentacion: "Bolsa 1kg",
          imagen: "https://images.unsplash.com/photo-1643926544872-dbcd8805e870?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG9tYXRlJTIwc2FsZXR8ZW58MHx8MHx8fDA%3D",
          descripcion: "Tomate fresco ideal para ensaladas y salsa"
        },
        {
          nombre: "Galletas de Chocolate",
          marca: "Chokis",
          categoria: "botanas",
          precio: 18.00,
          unidades: 210,
          presentacion: "Paquete 100g",
          imagen: "https://images.unsplash.com/photo-1611945007935-925b09ddcf1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbGxldGFzJTIwZGUlMjBjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
          descripcion: "Galletas con chispas de chocolate"
        },
        {
          nombre: "Cereal de Maíz",
          marca: "Kellogg's",
          categoria: "cereales",
          precio: 48.00,
          unidades: 140,
          presentacion: "Caja 500g",
          imagen: "https://images.unsplash.com/photo-1670087792710-de546fc8b74c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VyZWFsJTIwZGUlMjBtaWF6fGVufDB8fDB8fHww",
          descripcion: "Cereal de maíz crujiente"
        },
        {
          nombre: "Agua Embotellada",
          marca: "Bonafont",
          categoria: "bebidas",
          precio: 12.00,
          unidades: 300,
          presentacion: "Botella 1L",
          imagen: "https://images.unsplash.com/photo-1536939459926-301728717817?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWd1YSUyMGVtYm90ZWxsYXxlbnwwfHwwfHx8MA%3D%3D",
          descripcion: "Agua purificada baja en sodio"
        }
      ]
      
      await Producto.insertMany(productosIniciales)
      console.log(`✅ ${productosIniciales.length} productos insertados`)
    } else {
      console.log(`📊 Ya existen ${count} productos en la base de datos`)
    }
  } catch (error) {
    console.log('Error al inicializar datos:', error.message)
  }
}

// ========== RUTAS ==========

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Distribuidora El Buen Trato con MongoDB',
    version: '2.0.0',
    database: 'MongoDB Atlas',
    endpoints: {
      productos: '/api/productos',
      categorias: '/api/categorias',
      pedidos: '/api/pedidos'
    }
  })
})

// ========== RUTAS DE PRODUCTOS (MONGODB) ==========

// GET todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.find({})
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

// GET producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
    
    if (producto) {
      res.json(producto)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' })
  }
})

// GET productos por categoría
app.get('/api/productos/categoria/:categoria', async (req, res) => {
  try {
    const productos = await Producto.find({ categoria: req.params.categoria })
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar productos' })
  }
})

// POST crear nuevo producto
app.post('/api/productos', async (req, res) => {
  try {
    const producto = new Producto(req.body)
    const savedProducto = await producto.save()
    res.status(201).json(savedProducto)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto' })
  }
})

// PUT actualizar producto
app.put('/api/productos/:id', async (req, res) => {
  try {
    const updatedProducto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (updatedProducto) {
      res.json(updatedProducto)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto' })
  }
})

// DELETE eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const deletedProducto = await Producto.findByIdAndDelete(req.params.id)
    
    if (deletedProducto) {
      res.json(deletedProducto)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar producto' })
  }
})

// ========== RUTAS DE CATEGORÍAS ==========

// GET todas las categorías (ahora desde MongoDB)
app.get('/api/categorias', async (req, res) => {
  try {
    const categorias = await Producto.distinct('categoria')
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' })
  }
})

// ========== RUTAS DE PEDIDOS (SIMULADAS POR AHORA) ==========

let pedidos = []
let nextPedidoId = 1

app.get('/api/pedidos', (req, res) => {
  res.json(pedidos)
})

app.post('/api/pedidos', (req, res) => {
  const nuevoPedido = {
    id: nextPedidoId++,
    fecha: new Date().toISOString(),
    productos: req.body.productos,
    total: req.body.total,
    estado: 'pendiente',
    cliente: req.body.cliente || 'Cliente de prueba'
  }
  
  pedidos.push(nuevoPedido)
  res.status(201).json(nuevoPedido)
})

// ========== MANEJO DE ERRORES ==========

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// ========== INICIAR SERVIDOR ==========

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📦 Endpoints disponibles:`)
  console.log(`   GET  /api/productos (desde MongoDB)`)
  console.log(`   GET  /api/productos/:id`)
  console.log(`   POST /api/productos`)
  console.log(`   GET  /api/categorias (desde MongoDB)`)
  console.log(`   POST /api/pedidos`)
})