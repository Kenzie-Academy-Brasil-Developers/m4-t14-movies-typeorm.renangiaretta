import { Router } from "express";
import { createMovieController, deleteMovieController, getMovieController, updateMovieController } from "../controllers/movies.controller";
import { verifyIfNameAlreadyExists } from "../middlewares";

const movieRoutes: Router = Router()

movieRoutes.post('', verifyIfNameAlreadyExists, createMovieController)
movieRoutes.get('', getMovieController)
movieRoutes.patch('/:id', updateMovieController)
movieRoutes.delete('/:id', deleteMovieController)



export { movieRoutes }