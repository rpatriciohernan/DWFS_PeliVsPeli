const ActorService = require('../Services/actorService');
const service = new ActorService()

class Controller {

  constructor() { }

  async getActores(req, res) {
    const result = await service.getActorList();
    return res.status(200).json(result);
  }

}

module.exports = Controller;