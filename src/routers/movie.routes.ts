import { Router } from "express";
import { createMovieController, deleteMovieController, getMovieController, updateMovieController } from "../controllers/movies.controller";
import { ensureDataIsValidMiddleware, verifyIfMovieExistsMiddleware, verifyMovieIdMiddleware} from "../middlewares";
import { createMovieSchema, movieSchema, updateMovieSchema } from "../schemas";

const movieRoutes: Router = Router()

movieRoutes.post('', ensureDataIsValidMiddleware(createMovieSchema), verifyIfMovieExistsMiddleware, createMovieController)
movieRoutes.get('', getMovieController)
movieRoutes.patch('/:id', verifyMovieIdMiddleware, ensureDataIsValidMiddleware(updateMovieSchema), verifyIfMovieExistsMiddleware, updateMovieController)
movieRoutes.delete('/:id', verifyMovieIdMiddleware, deleteMovieController)



export { movieRoutes }