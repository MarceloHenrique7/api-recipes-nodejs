import { Router } from "express";
import RecipeController from "./app/controllers/RecipeController.js"


const router = Router();


router.get("/recipes", RecipeController.index);
router.get("/recipes/:id", RecipeController.show);
router.post("/recipes", RecipeController.store);
router.put("/recipes/:id", RecipeController.update);
router.delete("/recipes/:id", RecipeController.delete);


export default router;