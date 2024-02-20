import RecipeRepository from "../repositories/RecipeRepository.js";


class RecipeController {
    async index(req, res) {
        const row = await RecipeRepository.findAll();
        res.json(row)
    }

    async show(req, res) {
        const id = req.params.id
        const row = await RecipeRepository.findById(id);
        res.json(row)
    }

    async store(req, res) {
        const data = req.body;
        const row = await RecipeRepository.create(data);
        res.json(row)
    }

    async update(req, res) {
        const id = req.params.id;
        const data = req.body;
        const row = await RecipeRepository.update(data, id);
        res.json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        const row = await RecipeRepository.delete(id)
        res.json(row)
    }
}


export default new RecipeController();