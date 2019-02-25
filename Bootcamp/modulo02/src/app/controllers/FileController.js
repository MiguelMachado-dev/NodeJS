const path = require('path')
class FileController {
  show (req, res) {
    const { file } = req.params

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file // variavel que dei nome no req.params
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
