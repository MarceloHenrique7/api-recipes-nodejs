import { consult } from '../database/connection.js'


class RecipeRepository {

    create(data) {
        const sql = "INSERT INTO data_recipes SET ?"
        return consult(sql, data, "Não foi possivel fazer esse registro!!")
    }

    findAll() {
        const sql = "SELECT * FROM data_recipes"
        return consult(sql, "Não foi possivel encontrar os dados")
    }

    findById(id) {
        const sql = "SELECT * FROM data_recipes WHERE id=?"
        return consult(sql, id, "Não possivel encontrar esse usuário")
    }

    update(data, id) {
        const sql = "UPDATE data_recipes SET ? WHERE id=?"
        return consult(sql, [data, id], "Não foi possivel fazer essa atualização")
    }

    delete(id) {
        const sql = "DELETE FROM data_recipes WHERE id=?"
        return consult(sql, id, "Não foi possivel deletar esse registro")
    }

}

export default new RecipeRepository();