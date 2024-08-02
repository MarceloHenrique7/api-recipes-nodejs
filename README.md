API REST Recipes
Este repositório contém uma API REST para gerenciar receitas de culinária, utilizando Node.js, Express e MySQL. A API permite criar, listar, atualizar e deletar receitas.

Estrutura do Projeto

    api-rest-recipes/
    ├── src/
    │   ├── app/
    │   │   ├── controllers/
    │   │   │   └── RecipeController.js
    │   │   ├── repositories/
    │   │   │   └── RecipeRepository.js
    │   ├── database/
    │   │   └── connection.js
    │   ├── router.js
    │   └── app.js
    ├── package.json
    ├── README.md
    └── server.js

Pré-requisitos
        Node.js instalado
        MySQL instalado e configurado
Instalação
  1.Clone o repositório:

      git clone https://github.com/SeuUsuario/api-rest-recipes.git
    cd api-rest-recipes

  2.Instale as dependências:

    npm install
  3.Configure o banco de dados:
Certifique-se de que você possui um banco de dados MySQL rodando e configure as credenciais no arquivo src/database/connection.js:

    import mysql from "mysql";

    const connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "api_recipe"
    });
    
    connection.connect();
    
    export default connection;

  4.Crie o banco de dados e a tabela data_recipes:

  
    CREATE DATABASE api_recipe;

    USE api_recipe;

    CREATE TABLE data_recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL
    );

  5.Executando a Aplicação
Para iniciar a aplicação em modo de desenvolvimento, utilize o comando:

    npm run dev
A aplicação estará disponível em http://localhost:3333.

Endpoints
Listar todas as receitas

    GET /recipes
Obter uma receita por ID

    GET /recipes/:id

  Criar uma nova receita

    POST /recipes
    
Corpo da Requisição:

    {
      "name": "Nome da Receita",
      "ingredients": "Lista de Ingredientes",
      "instructions": "Instruções de Preparo"
    }
    
Atualizar uma receita por ID
    
    PUT /recipes/:id
    
Corpo da Requisição:
    
    {
      "name": "Nome da Receita Atualizado",
      "ingredients": "Lista de Ingredientes Atualizada",
      "instructions": "Instruções de Preparo Atualizadas"
    }
    
Deletar uma receita por ID

    DELETE /recipes/:id
    
Estrutura do Código

Conexão com o Banco de Dados

    import mysql from "mysql";
    
    const connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "api_recipe"
    });

    connection.connect();

    export const consult = (sql, values = "", messageReject) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, result) => {
                if (error) {
                    return reject(messageReject);
                } else {
                    const row = JSON.parse(JSON.stringify(result));
                    return resolve(row);
                }
            });
        });
    };

    export default connection;
    
Repositório de Receitas

    import { consult } from '../database/connection.js';
    
    class RecipeRepository {

    create(data) {
        const sql = "INSERT INTO data_recipes SET ?";
        return consult(sql, data, "Não foi possível fazer esse registro!!");
    }

    findAll() {
        const sql = "SELECT * FROM data_recipes";
        return consult(sql, "Não foi possível encontrar os dados");
    }

    findById(id) {
        const sql = "SELECT * FROM data_recipes WHERE id=?";
        return consult(sql, id, "Não foi possível encontrar essa receita");
    }

    update(data, id) {
        const sql = "UPDATE data_recipes SET ? WHERE id=?";
        return consult(sql, [data, id], "Não foi possível fazer essa atualização");
    }

    delete(id) {
        const sql = "DELETE FROM data_recipes WHERE id=?";
        return consult(sql, id, "Não foi possível deletar essa receita");
    }

    }

    export default new RecipeRepository();
    
Controlador de Receitas

    import RecipeRepository from "../repositories/RecipeRepository.js";
    
    class RecipeController {
        async index(req, res) {
            const row = await RecipeRepository.findAll();
            res.json(row);
        }

    async show(req, res) {
        const id = req.params.id;
        const row = await RecipeRepository.findById(id);
        res.json(row);
    }

    async store(req, res) {
        const data = req.body;
        const row = await RecipeRepository.create(data);
        res.json(row);
    }

    async update(req, res) {
        const id = req.params.id;
        const data = req.body;
        const row = await RecipeRepository.update(data, id);
        res.json(row);
    }

    async delete(req, res) {
        const id = req.params.id;
        const row = await RecipeRepository.delete(id);
        res.json(row);
    }
    }

    export default new RecipeController();
    
Rotas

    
    import { Router } from "express";
    import RecipeController from "./app/controllers/RecipeController.js";
    
    const router = Router();
    
    router.get("/recipes", RecipeController.index);
    router.get("/recipes/:id", RecipeController.show);
    router.post("/recipes", RecipeController.store);
    router.put("/recipes/:id", RecipeController.update);
    router.delete("/recipes/:id", RecipeController.delete);
    
    export default router;
    Aplicação Express
    javascript
    Copiar código
    import express from 'express';
    import routes from './router.js';
    
    const app = express();
    
    app.use(express.json());
    app.use(routes);
    
    export default app;
    
Servidor

    import app from "./src/app.js";
    
    const PORT = 3333;
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Licença
Este projeto está licenciado sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

