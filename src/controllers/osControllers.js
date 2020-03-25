const connections = require('../database/connection')
module.exports = {
  async index(request, response) {
    const os = await connections('os').select('*')

    for (const i in os) {
      const [produto] = await connections('produto').where('id', os[i].produto).select(['produto.type', 'produto.brand', 'produto.model', 'produto.sn'])
      os[i].produto = []
      os[i].produto.push(produto)
    }

    for (const i in os) {
      const [cliente] = await connections('cliente').where('id', os[i].cliente).select([
        'cliente.name',
        'cliente.email',
        'cliente.cpf',
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
      os[i].cliente = []
      os[i].cliente.push(cliente)
    }

    return response.json(os)
  },
  async create(request, response) {
    const { condicao, defeito, acessorios, solucao, laudo, garantia, produto, cliente, valor } = request.body
    const [id] = await connections('os').insert({
      condicao,
      defeito,
      acessorios,
      solucao,
      laudo,
      garantia,
      produto,
      cliente,
      valor
    })

    return response.json({ id })
  },
  async update(request, response) {

  },
  async delete(request, response) {
    const { id } = request.params
    await connections('os').where('id', id).delete()

    return response.status(204).send()
  },
  async show(request, response) {
    const { id } = request.params
    const os = await connections('os').where('id', id).select('*')

    for (const i in os) {
      const [produto] = await connections('produto').where('id', os[i].produto).select(['produto.type', 'produto.brand', 'produto.model', 'produto.sn'])
      os[i].produto = []
      os[i].produto.push(produto)
    }

    for (const i in os) {
      const [cliente] = await connections('cliente').where('id', os[i].cliente).select([
        'cliente.name',
        'cliente.email',
        'cliente.cpf',
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
      os[i].cliente = []
      os[i].cliente.push(cliente)
    }

    return response.json(os)
  },
}