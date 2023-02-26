import { DeepPartial, Repository } from 'typeorm';
import { 
    movieSchema,
    createMovieSchema,
    listMovieSchema
} from './../schemas'
import { z } from 'zod'
import { Movie } from '../entities';


type iMovie = z.infer<typeof movieSchema>
type iCreateMovie = z.infer<typeof createMovieSchema>
type iUpdateMovie = DeepPartial<iCreateMovie>
type iListMovie = z.infer<typeof listMovieSchema>

type iMovieRepo = Repository<Movie>

export {
    iMovie,
    iCreateMovie,
    iUpdateMovie,
    iListMovie,
    iMovieRepo
}