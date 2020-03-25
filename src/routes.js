const express = require('express')
const clienteController = require('./controllers/clienteControllers')
const produtoController = require('./controllers/produtoControllers')
const osController = require('./controllers/osControllers')
const route = express.Router()

// Rotas de Cliente
route.get('/cliente', clienteController.index)
route.post('/cliente', clienteController.create)
route.put('/cliente/:id', clienteController.update)
route.delete('/cliente/:id', clienteController.delete)
route.get('/cliente/:id', clienteController.show)

// Rotas de produto
route.get('/produto', produtoController.index)
route.post('/produto', produtoController.create)
route.put('/produto/:id', produtoController.update)
route.delete('/produto/:id', produtoController.delete)
route.get('/produto/:id', produtoController.show)

// Rotas de Ordem de Serviço
route.get('/os', osController.index)
route.post('/os', osController.create)
route.put('/os/:id', osController.update)
route.delete('/os/:id', osController.delete)
route.get('/os/:id', osController.show)
module.exports = route