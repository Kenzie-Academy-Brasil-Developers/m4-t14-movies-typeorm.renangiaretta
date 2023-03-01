import { 
    Request,
    Response
} from 'express';
import {
    iListMovie,
    iMovie
} from '../interfaces/movies.interface';
import { createMovieService, deleteMovieService, getMoviesService, updateMovieService } from '../services/movies.services';


const createMovieController = async ( req: Request, res: Response ) => {
    const movieData: iMovie = req.body
    const newMovie          = await createMovieService(movieData)
    return res.status(201).json(newMovie)
}

const getMovieController = async ( req: Request, res: Response ) => {
    const { perPage, page, order, sort } = req.query
    const movieId                        = req.params.id
    const movieListData: iListMovie      = await getMoviesService( perPage, page, order, sort, movieId )
    return res.status(200).json(movieListData)
}

const updateMovieController = async ( req: Request, res: Response ) => {
    const movieId: number   = parseInt(req.params.id)
    const movieData: iMovie = req.body
    if(req.body.id) {
        delete req.body.id
    }
    const updatedMovie = await updateMovieService(movieId, movieData)
    return res.status(200).json(updatedMovie)
}

const deleteMovieController = async ( req: Request, res: Response ) => {
    const movieId: number = parseInt(req.params.id)
    await deleteMovieService( movieId )
    return res.status(204).send()
}

export {
    createMovieController,
    getMovieController,
    updateMovieController,
    deleteMovieController
}