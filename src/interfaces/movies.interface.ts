import {
    DeepPartial,
    Repository
} from 'typeorm';

import { 
    movieSchema,
    createMovieSchema,
    listMovieSchema
} from '../schemas'

import { z } from 'zod'
import { Movie } from '../entities';


type iMovie = z.infer<typeof movieSchema>
type iMovieCreate = z.infer<typeof createMovieSchema>
type iMovieUpdate = DeepPartial<iMovieCreate>
type iListMovie = z.infer<typeof listMovieSchema>
type iMovieRepo = Repository<Movie>

export {
    iMovie,
    iMovieCreate,
    iMovieUpdate,
    iListMovie,
    iMovieRepo
}