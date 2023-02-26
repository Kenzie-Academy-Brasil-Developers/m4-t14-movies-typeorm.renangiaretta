import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { AppError } from "../errors"
import { iMovieRepo, iListMovie } from "../interfaces/movies.interface"
import { movieSchema, listMovieSchema, updateMovieSchema } from "../schemas"




const createMovieService = async ( payload: any )=> {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const movie: Movie = await movieRepo.save(payload)
    return movieSchema.parse(movie)
}

const getMoviesService = async ( ): Promise<iListMovie> => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const movieReturn: Array<Movie> = await movieRepo.find()
    return listMovieSchema.parse(movieReturn)


}

const updateMovieService = async ( id: number, payload: any ) => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({id})
    if(!foundMovie) {
        throw new AppError('Movie not found.', 404)
    }
    const movieUpdate: Movie = await movieRepo.save({
        ...foundMovie,
        ...payload
    })
    return updateMovieSchema.parse(movieUpdate)
}

const deleteMovieService = async ( id: number ) => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({
        id
    })
    if (!foundMovie) {
        throw new AppError('Movie not found', 404)
    }
    await movieRepo.remove(foundMovie)
}

export { createMovieService, getMoviesService, updateMovieService, deleteMovieService }