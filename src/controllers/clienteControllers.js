const connections = require('../database/connection')
module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query
    const clientes = await connections('cliente')
      .select([
        'cliente.*',
        'contato.telephone',
        'contato.whatsapp',
        'endereco.uf',
        'endereco.city',
        'endereco.neighborhood',
        'endereco.street',
        'endereco.number'
      ])
      .join('contato', 'contato.id_cliente', '=', 'cliente.id')
      .join('endereco', 'endereco.id_cliente', '=', 'cliente.id')
      .limit(5)
      .offset((page - 1) * 5)

    return response.json(clientes)
  },
  async create(request, response) {
    const { name, email, cpf, telephone, whatsapp, uf, city, neighborhood, street, number } = request.body
    const [id] = await connections('cliente').insert({
      name,
      email,
      cpf
    })
    await connections('contato').insert({
      telephone,
      whatsapp,
      id_cliente: id
    })
    await connections('endereco').insert({
      uf,
      city,
      neighborhood,
      street,
      number,
      id_cliente: id
    })

    return response.json({ id })
  },
  async update(request, response) {

  },
  async delete(request, response) {
    const { id } = request.params
    await connections('cliente').where('id', id).delete()

    return response.status(204).send()
  },
  async show(request, response) {
    const { id } = request.params
    const cliente = await connections('cliente')
      .where('id', id)
      .select([
        'cliente.*',
        'contato.telephone',
        'contato.whatsapp',
        'endereco.uf',
        'endereco.city',
        'endereco.neighborhood',
        'endereco.street',
        'endereco.number'
      ])
      .join('contato', 'contato.id_cliente', '=', 'cliente.id')
      .join('endereco', 'endereco.id_cliente', '=', 'cliente.id')

    return response.json(cliente)
  }
}