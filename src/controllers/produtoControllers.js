const connections = require('../database/connection')
module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query
    const produto = await connections('produto')
      .select([
        'produto.id',
        'produto.type',
        'produto.brand',
        'produto.model',
        'produto.sn',
        'cliente.name'
      ])
      .join('cliente', 'cliente.id', '=', 'produto.cliente')
      .limit(5)
      .offset((page - 1) * 5)

    return response.json(produto)
  },
  async create(request, response) {
    const { type, brand, model, sn, cliente } = request.body
    const [id] = await connections('produto').insert({
      type,
      brand,
      model,
      sn,
      cliente
    })

    return response.json({ id })
  },
  async update(request, response) {

  },
  async delete(request, response) {
    const { id } = request.params
    await connections('produto').where('id', id).delete()

    return response.status(204).send()
  },
  async show(request, response) {
    const { id } = request.params
    const produto = await connections('produto')
      .where('produto.id', id)
      .select([
        'produto.id',
        'produto.type',
        'produto.brand',
        'produto.model',
        'produto.sn',
        'cliente.name'
      ])
      .join('cliente', 'cliente.id', '=', 'produto.cliente')

    return response.json(produto)
  },
}