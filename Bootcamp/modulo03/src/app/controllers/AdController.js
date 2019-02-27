const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    // Listagem
    const ads = await Ad.paginate(
      {},
      {
        page: req.query.page || 1,
        populate: ['author'],
        limit: 20,
        sort: '-createdAt'
      }
    )
    // ?page=2 seria um meio de se passar paginacao por query

    return res.json(ads)
  }

  async show (req, res) {
    // quando quero exibir um unico ad
    const ad = await Ad.findById(req.params.id)

    return res.json(ad)
  }

  async store (req, res) {
    // criar um ad
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update (req, res) {
    // edição um ad
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(ad)
  }

  async destroy (req, res) {
    // deletar um ad
    await Ad.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
