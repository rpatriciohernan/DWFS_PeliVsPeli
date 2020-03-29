const GeneroService = require('../Services/generoService');
const service = new GeneroService()

class Controller {

  constructor() { }

  async getGeneros(req, res) {
    const result = await service.getGeneroList();
    return res.status(200).json(result);
  }

}

module.exports = Controller;