import { Router } from 'express';
import {
    createMovieController,
    deleteMovieController,
    getMovieController,
    updateMovieController
} from '../controllers/movies.controller';
import {
    ensureDataIsValidMiddleware,
    verifyIfMovieExistsMiddleware,
    verifyMovieIdMiddleware
} from '../middlewares';
import {
    createMovieSchema,
    updateMovieSchema
} from '../schemas';


const movieRoutes: Router = Router()

movieRoutes.post('',
verifyIfMovieExistsMiddleware,
ensureDataIsValidMiddleware(createMovieSchema),
createMovieController
)

movieRoutes.get('',
getMovieController
)

movieRoutes.patch('/:id',
ensureDataIsValidMiddleware(updateMovieSchema),
verifyMovieIdMiddleware,
verifyIfMovieExistsMiddleware,
updateMovieController
)

movieRoutes.delete('/:id',
verifyMovieIdMiddleware,
deleteMovieController
)


export { movieRoutes }