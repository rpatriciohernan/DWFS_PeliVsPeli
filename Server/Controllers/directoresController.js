const DirectorService = require('../Services/directorService');
const service = new DirectorService()

class Controller {

  constructor() { }

  async getDirectores(req, res) {
    const result = await service.getDirectorList();
    return res.status(200).json(result);
  }

}

module.exports = Controller;